import styles from './burgerMenu.module.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@admiral-ds/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
import { clearUser } from '@app/slices/userSlice.ts';
import * as React from "react";

export const BurgerMenu = () => {
  const user = useSelector((state: RootState) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickExit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu(e);
    localStorage.removeItem('token');
    dispatch(clearUser());
    window.location.reload();
  };

  return (
    <div ref={menuRef}>
      <div className={styles.burgerIcon} onClick={toggleMenu}>
        <Avatar
          userName={`${user.firstName} ${user.lastName}`}
          appearance={'neutral4'}
          dimension={'s'}
        />
      </div>

      <nav
        className={`${styles.menu} ${isOpen ? styles.open : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <Link to={'/'} onClick={closeMenu}>
          Доступные слоты
        </Link>
        <Link to={'/dataUser'} onClick={closeMenu}>
          Редактировать личные данные
        </Link>
        <Link to={'/vcs'} onClick={closeMenu}>
          Предстоящие ВКС
        </Link>
        <Link to={'/instruction'} onClick={closeMenu}>
          Посмотреть инструкцию
        </Link>
        <Link className={styles.exit} to={'/login'} onClick={handleClickExit}>
          Выйти
        </Link>
      </nav>
    </div>
  );
};
