import React from 'react';
import Styled from './Button.Styles';

interface ButtonProps {
    text: string;
    color?: string; 
    variant?: 'text' | 'contained' | 'outlined';
    [x: string]: any; 
}

const Button: React.FC<ButtonProps> = ({ text, color, variant = 'contained', ...props }) => (
    <Styled.Button customColor={color} variant={variant} {...props}>
        {text}
    </Styled.Button>
);

export default Button;
