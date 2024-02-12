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
`


export default {
    GroupContainer,
    ChatGrid
}