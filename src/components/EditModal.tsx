
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  data: any;
  type: 'user' | 'post';
}

const EditModal = ({ open, onClose, onSave, data, type }: EditModalProps) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{type === 'user' ? 'Edit User' : 'Edit Post'}</DialogTitle>
      <DialogContent>
        {type === 'user' ? (
          <>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              value={formData?.name || ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              fullWidth
              value={formData?.email || ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone"
              fullWidth
              value={formData?.phone || ''}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <TextField
              margin="dense"
              name="title"
              label="Title"
              fullWidth
              value={formData?.title || ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="body"
              label="Content"
              fullWidth
              multiline
              rows={4}
              value={formData?.body || ''}
              onChange={handleChange}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
