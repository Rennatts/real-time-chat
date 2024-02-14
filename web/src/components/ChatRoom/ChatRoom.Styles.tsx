import styled from 'styled-components';


interface CustomButtonProps {
    customColor?: string; 
}

const Text  = styled.p`
    color: black;
`

const MainContainer  = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 50%;
`;


const RoundContainer = styled.div`
    color: white !important;
    padding: 40% 40% !important;
    border-radius: 50% !important; 
`;

export default { 
    RoundContainer,
    MainContainer,
    Text
};
