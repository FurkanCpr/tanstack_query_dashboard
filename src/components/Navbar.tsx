
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <AppBar position="static" className="glass-card bg-opacity-30">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button color="inherit" onClick={() => navigate('/users')}>
              Users
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button color="inherit" onClick={() => navigate('/posts')}>
              Posts
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
