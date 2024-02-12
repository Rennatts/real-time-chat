import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

interface CustomSidebarProps {
    customColor?: string; 
}


const Container = styled.div<CustomSidebarProps>`
    background-color: ${props => props.customColor || '#364156'} !important; 
    color: white !important;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: 5%;
`;

export default { Container };
