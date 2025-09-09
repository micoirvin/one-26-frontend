import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import AuthRedirect from './components/AuthRedirect';
import TestPage from './routes/TestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          }
        />

        <Route path="/test" element={<TestPage />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
