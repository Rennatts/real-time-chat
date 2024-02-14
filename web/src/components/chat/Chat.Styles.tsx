import styled from 'styled-components';

const Container  = styled.div`
    margin-top: 2%;
    margin-bottom: 2%;
`;

const ChatBody  = styled.div`
    display: flex;
    justify-items: flex-end;
    align-items: center;
    flex-direction: column;
    min-width: 600px;
    width: 60%;
    border: 1px solid;
    border-color: gray;
    min-height: 200px;
    height: auto;
`;




export default { 
    ChatBody,
    Text,
    Container
};
