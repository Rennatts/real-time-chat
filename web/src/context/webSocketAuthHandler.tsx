import React, { useEffect, useContext } from 'react';
import { useUserContext } from './userContext';
import { useSocket } from './socketContext';

const WebSocketAuthHandler = () => {
  const { accessToken, userData, isLoading } = useUserContext();
  const socket = useSocket();

  useEffect(() => {
    if (!isLoading && userData.id && socket) {
      socket.emit('authenticate', { userId: userData.id, token: accessToken });
    }
  }, [userData, isLoading, socket]);

  return null;
};

export default WebSocketAuthHandler;
