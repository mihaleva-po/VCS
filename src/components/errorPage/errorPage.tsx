import error from '@assets/404.svg';
import { Link } from 'react-router-dom';
import styles from './errorPage.module.css';

export const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <h1>PAGE NOT FOUND</h1>
      <img src={error} alt="error_404" />
      <Link className={styles.backToHome} to={'/slots'}>
        Вернуться на главную
      </Link>
    </div>
  );
};
