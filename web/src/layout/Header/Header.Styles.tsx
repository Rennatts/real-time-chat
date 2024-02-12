import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

interface CustomSidebarProps {
    customColor?: string; 
}


const Container = styled.div<CustomSidebarProps>`
    background-color: ${props => props.customColor || '#364156'} !important; 
    color: white !important;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export default { Container };
