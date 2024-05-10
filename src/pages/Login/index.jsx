// import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth } from '../../redux/slices/AuthSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom/dist';

export const Login = () => {
  // const dipatch = useDispatch();

  const navigate = useNavigate();

  const { data } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchAuth(values));
      if ('token' in data.payload) {
        localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.log(data);
    }
  };
  if (data) {
    navigate('/');
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          {...register('password', { required: 'Укажите пароль' })}
          label="Пароль"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
