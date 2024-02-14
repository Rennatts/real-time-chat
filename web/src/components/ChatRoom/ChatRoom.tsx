import { Avatar } from '@mui/material';
import Styles from './ChatRoom.Styles';


interface Chat {
  roomId: string;
  roomName: string;
  description: string;
}

function ChatRoom({ roomId, roomName }: Chat) {

    function stringToColor(string: string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
      
        return color;
    }

    function stringAvatar(name: string) {
        let initials = name.split(' ').map((word) => word[0]).join('');
        if (initials.length > 2) { 
          initials = initials.substring(0, 2);
        } else if (initials.length < 2 && name.length >= 2) {
          initials = name.substring(0, 2);
        }
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: initials.toUpperCase(), 
        };
    }
      
  return (
    <Styles.MainContainer>
        <Avatar {...stringAvatar(roomName)}/>
        <Styles.Text>{roomName}</Styles.Text>
    </Styles.MainContainer>
  )
}

export default ChatRoom