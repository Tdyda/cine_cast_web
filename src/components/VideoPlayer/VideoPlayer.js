import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Hls from 'hls.js';
import api from '../axiosConfig';
import { useLocation } from "react-router-dom";
import styles from './VideoPlayer.module.css';
import { Helmet } from 'react-helmet';


const VideoPlayer = () => {
    const { id } = useParams();
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [manifestUrl, setManifestUrl] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get("title");

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const userId = localStorage.getItem('userId');
            const response = await api.post('/Account/refresh-token', { refreshToken, userId });
            const newToken = response.data.accessToken;
            localStorage.setItem('token', newToken);
            return newToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    };

    const isTokenExpired = (token) => {
        if (!token) return true;
    
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);

            return payload.exp < currentTime;
        } catch (error) {
            console.error('Błąd podczas dekodowania tokenu:', error);
            return true;
        }
    };    
    

    useEffect(() => {
        const fetchManifest = async () => {
            try {
                const response = await api.get(`/MediaStreaming/playlist/${id}`);
                const data = await response.data;
                const blob = new Blob([data], { type: 'application/vnd.apple.mpegurl' });
                const url = URL.createObjectURL(blob);
                setManifestUrl(url);
            } catch (error) {
                console.error('Error fetching manifest:', error);
            }
        };
        
        fetchManifest();
    }, [id]);

    useEffect(() => {
        const video = videoRef.current;

        if (Hls.isSupported() && video && manifestUrl) {
            const hls = new Hls({
                xhrSetup: async (xhr) => {
                    try {
                        let token = localStorage.getItem('token');
        
                        if (isTokenExpired(token)) {
                            token = await refreshToken();
                        }

                        xhr.onreadystatechange = () => {
                            if (xhr.readyState === 1) {
                                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                            }
                        };
        
                    } catch (error) {
                        console.error('Błąd podczas ustawiania nagłówka autoryzacyjnego:', error);
                    }
                },
                maxBufferLength: 300,
                maxBufferSize: 100 * 1024 * 1024,
                maxMaxBufferLength: 300,
                autoStartLoad: true
            });

            hls.loadSource(manifestUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (isPlaying) {
                    video.play().catch(error => {
                        console.error("Error trying to play video:", error);
                    });
                }
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS.js error:', event, data);
            });

            return () => {
                hls.destroy();
            };
        } else if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = manifestUrl;
            video.addEventListener('loadedmetadata', () => {
                if (isPlaying) {
                    video.play().catch(error => {
                        console.error("Error trying to play video:", error);
                    });
                }
            });
        }

        return () => {
            if (video) {
                video.src = '';
                video.load();
            }
        };
    }, [manifestUrl, isPlaying]);

    const handlePlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Error trying to play video:", error);
            });
        }
    };

    return (
        <div className={styles.VideoPlayerWrapper}>
            <Helmet>
                <title>{title}</title>
            </Helmet>      
            <video ref={videoRef} controls className={styles.VideoPlayer}/>
            <h1 className={styles.title}>{title}</h1>
            <button onClick={handlePlay} style={{ marginTop: '10px', display: 'none' }} >
                Play Video
            </button>
        </div>
    );
};

export default VideoPlayer;