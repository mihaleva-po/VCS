import styles from './loginForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import user from '@assets/user.svg';
import password from '@assets/password.svg';
import { useLoginUserMutation } from '@app/services/loginUser.ts';
import { setUser } from '@app/slices/userSlice.ts';
import { AppDispatch } from '@app/store.ts';
import { useDispatch } from 'react-redux';
import { FormLogin } from '@sharedTypes/types.ts';
import { useState } from 'react';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Обязательное поле')
    .min(4, 'Имя пользователя должно содержать не менее 4 символов')
    .max(50, 'Имя пользователя должно содержать не более 50 символов'),

  password: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(60, 'Пароль должен содержать не более 60 символов'),
});

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [loginUser] = useLoginUserMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormLogin) => {
    setIsLoading(true);
    // await auth(values.username, values.password);

    const dataUser = await loginUser({
      username: values.username,
      password: values.password,
    }).unwrap();

    localStorage.setItem('token', dataUser.token);

    dispatch(setUser(dataUser));
    setIsLoading(false);

    window.location.reload();
  };

  return (
    <section className={styles.container}>
      <h1>Вход</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.containerInput}>
            <div className={styles.containerInput}>
              <img alt={'icon_user'} src={user} />
              <Field
                className={styles.input}
                placeholder={'Логин'}
                type="text"
                id="username"
                name="username"
              />
            </div>
            <ErrorMessage
              className={styles.error}
              name="username"
              component="div"
            />
          </div>

          <div className={styles.containerInput}>
            <div className={styles.containerInput}>
              <img alt={'icon_password'} src={password} />
              <Field
                className={styles.input}
                placeholder={'Пароль'}
                type="password"
                id="password"
                name="password"
              />
            </div>
            <ErrorMessage
              className={styles.error}
              name="password"
              component="div"
            />
          </div>
          <button disabled={isLoading} type="submit">
            Войти
          </button>
          <div>
            <Link className={styles.link} to={'/register'}>
              Создать аккаунт
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
};
