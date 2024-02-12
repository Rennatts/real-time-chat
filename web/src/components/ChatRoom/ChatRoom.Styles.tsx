import styled from 'styled-components';


interface CustomButtonProps {
    customColor?: string; 
}

const Text  = styled.p`
    color: black;
`

const MainContainer  = styled.div<CustomButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 50%;
    background-color: ${props => props.customColor || '#f2f8f3'} !important; 
`;


const RoundContainer = styled.div<CustomButtonProps>`
    background-color: ${props => props.customColor || '#364156'} !important; 
    color: white !important;
    padding: 40% 40% !important;
    border-radius: 50% !important; 
`;

export default { 
    RoundContainer,
    MainContainer,
    Text
};
