import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Users from './pages/Users';
import Posts from './pages/Posts';
import { PostsProvider } from './contexts/PostsContext'; // PostsProvider'ı import edin

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PostsProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-secondary to-background">
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/posts"
                  element={
                    <ProtectedRoute>
                      <Posts />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </PostsProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
