import styles from './registerForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useRegisterUserMutation } from '@app/services/registerUser.ts';
import { FormRegister } from '@sharedTypes/types.ts';
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

  email: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Email должен содержать не менее 6 символов')
    .max(50, 'Email должен содержать не более 50 символов'),

  firstName: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Поле должно содержать не менее 6 символов')
    .max(50, 'Поле должно содержать не более 50 символов'),

  lastName: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Поле должно содержать не менее 6 символов')
    .max(50, 'Поле должно содержать не более 50 символов'),
  phone: Yup.string()
    .required('Обязательное поле')
    .matches(/^\+7\d{10}$/, 'Телефон должен начинаться с +7'),
});

export const RegisterForm = () => {
  const [registerUser] = useRegisterUserMutation();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (values: FormRegister) => {
    setIsLoading(true);
    await registerUser({
      username: values.username,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    }).unwrap();

    setIsLoading(false);
    navigate('/');
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Регистрация</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className={styles.inputs}>
            <div className={styles.containerInput}>
              <Field
                className={styles.input}
                placeholder={'Имя'}
                type="text"
                id="firstName"
                name="firstName"
              />
              <ErrorMessage
                className={styles.error}
                name="firstName"
                component="div"
              />
            </div>

            <div className={styles.containerInput}>
              <Field
                className={styles.input}
                placeholder={'Фамилия'}
                type="text"
                id="lastName"
                name="lastName"
              />
              <ErrorMessage
                className={styles.error}
                name="lastName"
                component="div"
              />
            </div>

            <div className={styles.containerInput}>
              <Field
                className={styles.input}
                placeholder={'Почта'}
                type="email"
                id="email"
                name="email"
              />
              <ErrorMessage
                className={styles.error}
                name="email"
                component="div"
              />
            </div>

            <div className={styles.containerInput}>
              <Field
                className={styles.input}
                placeholder={'Телефон'}
                type="phone"
                id="phone"
                name="phone"
              />
              <ErrorMessage
                className={styles.error}
                name="phone"
                component="div"
              />
            </div>

            <div className={styles.containerInput}>
              <Field
                className={styles.input}
                placeholder={'Логин'}
                type="text"
                id="username"
                name="username"
              />
              <ErrorMessage
                className={styles.error}
                name="username"
                component="div"
              />
            </div>

            <div className={styles.containerInput}>
              <Field
                className={styles.input}
                placeholder={'Пароль'}
                type="password"
                id="password"
                name="password"
              />
              <ErrorMessage
                className={styles.error}
                name="password"
                component="div"
              />
            </div>

            <div className={styles.containerInput}>
              <button disabled={isLoading} type="submit">
                Зарегистрироваться
              </button>
            </div>

            <div className={styles.politika}>
              Нажимая «Зарегистрироваться», вы принимаете{' '}
              <a href="https://report.eco-c.ru/doc/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5.pdf">
                пользовательское соглашение
              </a>{' '}
              и{' '}
              <a href="https://romano-landing-nextjs.vercel.app/files/privacy_policy.pdf">
                политику конфиденциальности
              </a>
            </div>

            <div>
              <Link className={styles.link} to={'/'}>
                Войти в аккаунт
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};
