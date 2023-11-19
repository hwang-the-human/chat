import { Route, Routes } from 'react-router-dom';
import Main from '../components/pages/main/main';
import Login from '../components/pages/auth/login';
import Registration from '../components/pages/auth/registration';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
}
