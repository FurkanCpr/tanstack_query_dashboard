import { useState } from 'react';
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
import EditModal from '../components/EditModal';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../contexts/PostsContext'; // usePosts hook'unu import edin

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Posts = () => {
  const { user } = useAuth();
  const { posts, addPost, updatePost, deletePost } = usePosts(); // usePosts hook'unu kullanın
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPost({
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      title: '',
      body: '',
      userId: parseInt(user?.id || '0'),
    });
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      deletePost(id);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleSave = async (postData: Post) => {
    try {
      if (isAddMode) {
        addPost(postData);
      } else {
        updatePost(postData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save post:', error);
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
              Add Post
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.body.substring(0, 100)}...</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEdit(post)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(post.id)}
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
        data={editingPost}
        type="post"
      />
    </Container>
  );
};

export default Posts;
