import React from 'react';

interface CreateChatRoomProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { chatRoomName: string; chatRoomDescription: string }) => void;
}

const CreateChatRoom: React.FC<CreateChatRoomProps> = ({ isOpen, onClose, onSubmit }) => {
  const [chatRoomName, setChatRoomName] = React.useState('');
  const [chatRoomDescription, setChatRoomDescription] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ chatRoomName, chatRoomDescription });
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fieldOne">chat room Name:</label>
          <input id="chatRoomName" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="fieldTwo">chat Room Description:</label>
          <input id="chatRoomDescription" value={chatRoomDescription} onChange={(e) => setChatRoomDescription(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CreateChatRoom;
