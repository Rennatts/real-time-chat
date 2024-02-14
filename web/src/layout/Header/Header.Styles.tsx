import styled from 'styled-components';

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

const ButtonBox = styled.div`
    color: white !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export default { 
    Container,
    ButtonBox
};
