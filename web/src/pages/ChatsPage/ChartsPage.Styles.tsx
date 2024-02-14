import styled from 'styled-components';

interface CustomProps {
    customColor?: string; 
}

const GroupContainer  = styled.li<CustomProps>`
    display: flex;
    justify-content: center;
    align-items: center;
`;


const ChatGrid =styled.li<CustomProps>`
    display: grid;
    list-style-type: none;
    flex-wrap: wrap;
    flex-flow: row wrap;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr;
    grid-gap: 1.2em;
    cursor: pointer;
    margin-top: 3%;
`

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1%;
    margin-top: 2%;
    background-color: #CDCDCD;
`

const InvitationsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
    gap: 10px; 
    padding: 10px; 
    align-items: start; 
`;



export default {
    GroupContainer,
    ChatGrid,
    Header,
    InvitationsList
}