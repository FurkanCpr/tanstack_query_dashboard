
import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useGet, useDelete, usePost, usePut } from '../hooks/useApi';
import EditModal from '../components/EditModal';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Users = () => {
  const { user } = useAuth();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    if (user) {
      // Initialize with logged-in user data
      setLocalUsers([{
        id: 1,
        name: user.name,
        email: user.email,
        phone: user.phone
      }]);
    }
  }, [user]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser({
      id: Math.max(...localUsers.map(u => u.id), 0) + 1,
      name: '',
      email: '',
      phone: '',
    });
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // Update local state
      setLocalUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleSave = async (userData: User) => {
    try {
      if (isAddMode) {
        // Update local state
        setLocalUsers(prev => [...prev, userData]);
      } else {
        // Update local state
        setLocalUsers(prev =>
          prev.map(user => (user.id === userData.id ? userData : user))
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  return (
    <Container className="mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper className="glass-card p-4">
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
            >
              Add User
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {localUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEdit(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </motion.div>

      <EditModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        data={editingUser}
        type="user"
      />
    </Container>
  );
};

export default Users;
