import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import Chat from '../components/pages/chat';
import Login from '../components/pages/auth/login';
import Registration from '../components/pages/auth/registration';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
