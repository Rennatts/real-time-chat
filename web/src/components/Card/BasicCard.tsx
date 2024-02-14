import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type InvitationProps = {
  onAccept: () => void;
  invitationId: string;
  roomId: string;
  roomName: string;
  senderId: string;
  senderName: string;
  recipientId: string;
};

export default function BasicCard({ roomName, senderName, onAccept }: InvitationProps) {
  return (
    <Card 
    sx={{ 
      width: '30%',
      minWidth: 175, 
      marginBottom: 2, 
      border: '1px solid', 
      borderColor: 'primary.main', 
      borderRadius: '8px', 
    }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Convite para o Chat {roomName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Enviado por {senderName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onAccept}>Entrar</Button>
      </CardActions>
    </Card>
  );
}
