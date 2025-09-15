import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './routes/HomePage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import AuthRedirect from './components/AuthRedirect';
import TestPage from './routes/TestPage';
import BlockingErrorIndicator from './components/BlockingErrorIndicator';
import AboutPage from './routes/AboutPage';
import PoliciesPage from './routes/PoliciesPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRedirect>
                <HomePage />
              </AuthRedirect>
            }
          />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/policies" element={<PoliciesPage />} />

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <BlockingErrorIndicator />
    </>
  );
}

export default App;
