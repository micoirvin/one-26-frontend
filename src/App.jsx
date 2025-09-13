import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import AuthRedirect from './components/AuthRedirect';
import TestPage from './routes/TestPage';
import BlockingErrorIndicator from './components/BlockingErrorIndicator';
import About from './routes/About';

function App() {
  return (
    <>
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

          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <BlockingErrorIndicator />
    </>
  );
}

export default App;
