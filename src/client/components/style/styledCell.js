import styled from 'styled-components'

const styledCell = styled.div`
  height: 100%;
  background: rgba(${props => props.color}, 1);
  border-bottom-color: rgba(${props => props.color}, 1);
  border-right-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 1);
  border-top-color: rgba(${props => props.color}, 1);
  `
export default styledCell;