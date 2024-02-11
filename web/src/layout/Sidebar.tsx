import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/ChatTwoTone';
import { PiChatsCircle } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import AccessAlarmIcon from '@mui/icons-material/NavigateNextSharp';
import { useLogoutUser } from '../hooks/useLogoutUser';
import { useUserContext } from '../context/userContext';
import Styled from './Sidebar.Styles';

export default function Sidebar() {
    const { accessToken, userData } = useUserContext();
    const logoutUser = useLogoutUser();
  
    const userLoggedIn = !!accessToken;

    const [state, setState] = React.useState({
        left: false, 
    });

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
        ) {
        return;
        }

        setState({ left: open });
    };

    const list = () => (
        <Box
        sx={{ width: 250, height: 100, backgroundColo: 'red' }} 
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <PiChatsCircle size={25}/>
                </ListItemIcon>
                <ListItemText primary={'Chats'} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <IoIosSearch size={25}/>
                </ListItemIcon>
                <ListItemText primary={'Search'} />
                </ListItemButton>
            </ListItem>
            {/* {['Chats', 'Search'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))} */}
        </List>
        <Divider />
        {userLoggedIn ? 
        (
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <IoSettingsOutline size={25}/>
                    </ListItemIcon>
                    <ListItemText primary={'Settings'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={logoutUser}>
                    <ListItemIcon>
                        <IoLogOutOutline size={25}/>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                    </ListItemButton>
                </ListItem>
                {/* {['All mail', 'Trash'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))} */}
            </List>
        ) 
        : 
        (<></>)
        }
        </Box>
    );

    return (
        <Styled.Container>
            <Button
                onClick={toggleDrawer(true)}
                sx={{
                    fontSize: 'large', 
                    width: '64px', 
                    height: '64px', 
                    minWidth: '64px', 
                }}
            >
                <AccessAlarmIcon style={{ color: 'white', fontSize: 40 }}/>
            </Button>
]
            <SwipeableDrawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </Styled.Container>
    );
}