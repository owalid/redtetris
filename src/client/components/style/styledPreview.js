import styled from 'styled-components'

const StyledPreview = styled.div`
margin: auto;
display: grid;
grid-template-rows: repeat(
  ${props => props.height},
  calc(8vw / ${props => props.width})
);
grid-template-columns: repeat(${props => props.width}, 1fr);
grid-gap: 1px;
width: 100%;
max-width: 8vw;
background: #fffff;
`
export default StyledPreview;