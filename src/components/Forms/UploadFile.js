import api from '../axiosConfig';
import React, { useState } from 'react';
import Actors from '../Actors/Actors';
import styles from './Form.module.css'
import formStyles from '../Login/Login.module.css'
import { useRef } from 'react';
import { Helmet } from 'react-helmet';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const CHUNK_SIZE = 5 * 1024 * 1024;
  const [selectedActor, setSelectedActor] = useState(null);
  const [isStaredUplaod, setStartedUpload] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();   
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const uploadFileInChunks = async () => {
    setStartedUpload(true)
    if (!file) {
      alert('Wybierz plik przed rozpoczęciem przesyłania');
      return;
    }

    if (!fileName) {
      alert('Podaj nazwę pliku, pod którą ma zostać zapisany na serwerze');
      return;
    }

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let start = 0;

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('chunkIndex', chunkIndex);
      formData.append('totalChunks', totalChunks);
      formData.append('fileName', fileName);
      formData.append("actors", selectedActor);

      try {
        await api.post('ManageFiles/upload', formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((chunkIndex + progressEvent.loaded / progressEvent.total) * (100 / totalChunks));
            setUploadProgress(percentCompleted);
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => console.log(response))

        start = end;
      } catch (error) {
        console.error('Błąd przesyłania fragmentu', error);
        return;
      }
    }
    alert('Przesyłanie zakończone');
  };

  return (
    <div className={styles.form}>
      <Helmet>
        <title>Panel administracyjny</title>
      </Helmet>
      <input
        type="text"
        placeholder="Podaj nazwę pliku na serwerze"
        value={fileName}
        onChange={handleFileNameChange}
        className={formStyles.input}
      />

      <Actors onSelect={(actorName) => setSelectedActor(actorName)} className={styles.actorField} />

      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }} />

      <button
        type="button"
        onClick={handleButtonClick}
        className={styles.fileButton}
      >
        Wybierz plik
      </button>

      <button onClick={uploadFileInChunks} disabled={!file || !fileName} className={styles.fileButton}>
        <span>Wyślij plik</span>
      </button>

      {isStaredUplaod && <div>Upload Progress: {uploadProgress}%</div>}
    </div>
  );
};

export default UploadFile;
