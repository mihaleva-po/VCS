import styles from './dataUser.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { RootState } from '@app/store.ts';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Обязательное поле')
    .min(4, 'Имя пользователя должно содержать не менее 4 символов')
    .max(50, 'Имя пользователя должно содержать не более 50 символов'),

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

  password: Yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(60, 'Пароль должен содержать не более 60 символов')
    .nullable(), // Поле пароля необязательно
});

export const DataUser = () => {
  const user = useSelector((state: RootState) => state.user);

  const handleSubmit = async () => {
    // обновление пользовательских данных (ждем бэк)
    // await updateUser(
    //   values.username,
    //   values.email,
    //   values.firstName,
    //   values.lastName,
    //   values.phone,
    //   values.password
    // );
  };

  return (
    <section className={styles.container}>
      <h1>Личные данные</h1>
      <Formik
        initialValues={{
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          <div className={styles.containerInput}>
            <label htmlFor="firstName">Имя</label>
            <Field
              className={styles.input}
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
            <label htmlFor="lastName">Фамилия</label>
            <Field
              className={styles.input}
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
            <label htmlFor="email">Почта</label>
            <Field
              className={styles.input}
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
            <label htmlFor="phone">Телефон</label>
            <Field
              className={styles.input}
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
            <label htmlFor="username">Логин</label>
            <Field
              className={styles.input}
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
            <label htmlFor="password">Пароль</label>
            <Field
              className={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder=""
            />
            <ErrorMessage
              className={styles.error}
              name="password"
              component="div"
            />
          </div>

          <button type="submit">Сохранить изменения</button>
        </Form>
      </Formik>
    </section>
  );
};
