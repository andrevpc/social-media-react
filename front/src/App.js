import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import AddPostPage from './pages/AddPost';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { AlertProvider } from './context/alert';
import './App.css';

function App() {
  return (
    <>
      <AlertProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/add' element={<AddPostPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </AlertProvider>
    </>
  );
}

export default App;