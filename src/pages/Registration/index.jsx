import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister } from '../../redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom/dist';

export const Registration = () => {
  // const { data } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (data.payload) {
      localStorage.setItem('token', data.payload.token);
      navigate('/');
    }
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('fullName', { required: 'Укажите Имя и Фамилию' })}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          {...register('email', { required: 'Укажите почту' })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          {...register('password', { required: 'Укажите пароль' })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
