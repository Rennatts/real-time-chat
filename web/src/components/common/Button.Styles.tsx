import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

interface CustomButtonProps {
    customColor?: string; 
}


const Button = styled(MuiButton)<CustomButtonProps>`
    background-color: ${props => props.customColor || '#364156'} !important; 
    color: white !important;
    padding: 10px 20px !important;
    border-radius: 3px !important;

    &:hover {
        background-color: darkblue !important;
    }
`;

export default { Button };
