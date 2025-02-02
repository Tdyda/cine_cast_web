import React, { useState } from 'react';

function VideoTrimmer({ videoUrl, onTrim }) {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10); // Przykładowe wartości początkowe

    const handleTrimClick = () => {
        onTrim(start, end); // Wywołanie funkcji trimowania z parametrami start i end
    };

    return (
        <div>
            <h4>Wybierz fragment wideo:</h4>
            <video src={videoUrl} controls width="400" />
            <div>
                <label>Start (sekundy):</label>
                <input
                    type="number"
                    value={start}
                    onChange={(e) => setStart(Number(e.target.value))}
                    min="0"
                />
                <label>End (sekundy):</label>
                <input
                    type="number"
                    value={end}
                    onChange={(e) => setEnd(Number(e.target.value))}
                    min="0"
                />
                <button onClick={handleTrimClick}>Przytnij wideo</button>
            </div>
        </div>
    );
}

export default VideoTrimmer;
