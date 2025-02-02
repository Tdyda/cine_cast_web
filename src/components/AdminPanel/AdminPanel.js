import React, { useEffect, useState } from 'react';
import defaultStyles from '../Forms/Form.module.css'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AdminPanel = () => {
    const navigate = useNavigate();

    const videoForm = () => {
        navigate('./video-form')
    }

    const tagForm = () => {
        navigate('./tag-form')
    }

    const actorForm = () => {
        navigate('./actor-form')
    }
    
    const Edit = () => {
        navigate('./edit')
    }

    return(
        <div className={defaultStyles.form}>
            <Helmet>
                <title>Panel administracyjny</title>
            </Helmet>
            <button className={defaultStyles.fileButton} onClick={videoForm}>Dodaj film</button>
            <button className={defaultStyles.fileButton} onClick={tagForm}>Dodaj tag</button>
            <button className={defaultStyles.fileButton} onClick={actorForm}>Dodaj aktora</button>
            <button className={defaultStyles.fileButton} onClick={Edit}>Edytuj filmy</button>
        </div>
    )
}

export default AdminPanel