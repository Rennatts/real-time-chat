import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useRef } from 'react';

interface CreateChatRoomProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { chatRoomName: string; chatRoomDescription: string }) => void;
}

const CreateChatRoom: React.FC<CreateChatRoomProps> = ({ isOpen, onClose, onSubmit }) => {
  const chatRoomNameRef = useRef<HTMLInputElement>(null);
  const chatRoomDescriptionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const chatRoomName = chatRoomNameRef.current?.value;
    const chatRoomDescription = chatRoomDescriptionRef.current?.value;
    if (chatRoomName && chatRoomDescription) {
      onSubmit({ chatRoomName, chatRoomDescription });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          backgroundColor: 'white', 
          border: "1px solid gray",
          position: 'fixed',
          padding: '5%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="chatRoomName"
            label="Chat Room Name"
            name="chatRoomName"
            autoComplete="chatRoomName"
            autoFocus
            inputRef={chatRoomNameRef}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="chatRoomDescription"
            label="Chat Room Description"
            name="chatRoomDescription"
            autoComplete="chatRoomDescription"
            inputRef={chatRoomDescriptionRef}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
        </Box>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default CreateChatRoom;
