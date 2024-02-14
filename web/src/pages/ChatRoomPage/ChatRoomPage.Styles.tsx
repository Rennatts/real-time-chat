import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1%;
    background-color: #CDCDCD;
`

const ChatContainer  = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    min-height: 200px;
    width: 60%;
    height: auto;
    
`;

const InviteBox  = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 8%;
`;



export default {
    Container,
    ChatContainer,
    Header,
    InviteBox
}