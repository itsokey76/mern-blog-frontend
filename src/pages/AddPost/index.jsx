import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const isAuth = useSelector((state) => state.auth.data);

  const { id } = useParams();
  const isEdit = id ? true : false;

  const navigate = useNavigate();

  if (!isAuth) {
    navigate('/');
  }

  const item = useSelector((state) => state.posts.posts.items).find((i) => i._id === id);

  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputRef = useRef();

  useState(() => {
    if (item) {
      setValue(item.text);
      setTitle(item.title);
      setTags(item.tags.join(' '));
      setImageUrl(item.imageUrl);
    }
  }, []);

  console.log(title, tags, value);

  const handleChangeFile = async (e) => {
    try {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      console.log('baza');
      console.log(data);
      setImageUrl(data.url);
    } catch (error) {
      throw new Error(error);
    }
  };

  console.log(imageUrl);

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const onSubmit = async () => {
    if (title && value) {
      try {
        const item = {
          title,
          text: value,
          tags: tags.split(' '),
          imageUrl: imageUrl,
        };
        console.log(item);
        if (isEdit) {
          console.log(isEdit);
          const { data } = await axios.patch(`/posts/${id}/`, item);
          console.log(data);
          navigate(`/posts/${id}`);
          return;
        } else {
          const { data } = await axios.post('/posts/', item);
          console.log(data);
          navigate(`/posts/${data._id}`);

          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(imageUrl);
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputRef} type="file" onChange={(e) => handleChangeFile(e)} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={() => onSubmit()} size="large" variant="contained">
          {!isEdit ? 'Опубликовать' : 'Изменить'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
