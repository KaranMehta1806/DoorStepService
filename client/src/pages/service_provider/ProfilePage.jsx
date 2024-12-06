import style from "../../css_modules/profile.module.css"    
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext } from "react";


export default function ProviderProfile(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState('https://via.placeholder.com/150');
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file)); 
      }
    };
    const styles = {
      container: {
        maxWidth: '600px',
        margin: '80px auto',
        padding: '30px',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        textAlign: 'center',
      },
      formGroup: {
        marginBottom: '20px',
        textAlign: 'left',
      },
      label: {
        display: 'block',
        fontSize: '14px',
        color: '#333',
        marginBottom: '8px',
      },
      input: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      },
      textArea: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        resize: 'vertical',
      },
      button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#fe6930',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
      },
      profilePic: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        marginBottom: '20px',
        border: '2px solid #fe6930',
      },
    };
    return(
        <>
       
    <div style={styles.container}>
      <div>
        <img src={image} alt="Uploaded" style={styles.profilePic} /><br/>
        <input 
          type="file" 
          onChange={handleImageUpload} 
          style={{ marginTop: '10px', marginBottom: '20px' }} 
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <input type="text" placeholder="Category" style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea placeholder="Description" style={styles.textArea}></textarea>
      </div>
      <button style={styles.button}>Update</button>
    </div>
    </>
    )
}   