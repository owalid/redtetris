import styled from 'styled-components'

const styledStage = styled.div`
margin: auto;
display: grid;
grid-template-rows: repeat(
  ${props => props.height},
  calc(${props => (props.isOtherUser) ? '15vw' : '25vw'} / ${props => (props.isOtherUser) ? props.width : props.width})
);
grid-template-columns: repeat(${props => props.width}, 1fr);
grid-gap: 2px;
border: 2px solid rgba(0, 0, 0, 0.2);
width: 100%;
max-width: ${props => (props.isOtherUser) ? '15vw' : '25vw'};
background-color: rgba(0, 0, 0, 0.2);
`
export default styledStage;