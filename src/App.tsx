import './App.css';
import { Slots } from './components/slots/slots.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RegisterForm } from './components/auth/register/registerForm.tsx';
import { LoginForm } from './components/auth/login/loginForm.tsx';
import { ErrorPage } from './components/errorPage/errorPage.tsx';
import { DataUser } from './components/dataUser/dataUser.tsx';
import { BurgerMenu } from './components/burgerMenu/burgerMenu.tsx';
import { Records } from './components/Records/Records.tsx';
import { Instruction } from './components/instruction/instruction.tsx';

export function App() {
  const token = localStorage.getItem('token');

  return (
    <div className={'app'}>
      {token && <BurgerMenu />}

      <Routes>
        {token && (
          <>
            <Route path={'*'} element={<Navigate to={'/404'} />} />
            <Route path="/" element={<Slots />} />
            <Route path="/login" element={<Navigate to={'/'} />} />
            <Route path="/register" element={<Navigate to={'/'} />} />
            <Route path="/dataUser" element={<DataUser />} />
            <Route path={'/vcs'} element={<Records />} />
            <Route path={'/instruction'} element={<Instruction />} />
            <Route path={'/404'} element={<ErrorPage />} />
          </>
        )}
        {!token && (
          <>
            <Route path={'*'} element={<Navigate to={'/login'} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </>
        )}
      </Routes>
    </div>
  );
}
