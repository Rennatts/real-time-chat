import styled from 'styled-components';

const Container  = styled.div`
    margin-top: 2%;
    margin-bottom: 2%;
    width: 100%;
`;

const ChatBody  = styled.div`
    display: flex;
    justify-items: flex-end;
    align-items: flex-start;
    flex-direction: column;
    min-width: 600px;
    width: 100%;
    border: 1px solid;
    border-color: gray;
    min-height: 200px;
    height: auto;
    padding: 2%;
`;

const Message  = styled.li`
    list-style-type: none;
`;





export default { 
    ChatBody,
    Text,
    Container,
    Message
};
