import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import Register from './pages/Register';
import { AlertProvider } from './context/alert';
import './App.css';
import ProtectedRoute from './pages/ProtectedRoute';
import { AccessDenied } from './pages/AccessDenied';
import NavBar from './components/NavBar';
import NotFoundPage from './pages/NotFoundPage';
import { LanguageProvider } from './context/language';
import { DarkModeProvider } from './context/darkMode';

function App() {
  return (
    <>
      <DarkModeProvider>
        <LanguageProvider>
          <AlertProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='' element={
                <ProtectedRoute
                  errorPage={<AccessDenied />}
                  targetPage={<NavBar />}
                />
              }>
                <Route path='/home' element={<Home />} />
                <Route path='/add' element={<AddPost />} />
              </Route>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </AlertProvider>
        </LanguageProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;