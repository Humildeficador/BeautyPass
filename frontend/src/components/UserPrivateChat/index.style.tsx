import styled from 'styled-components'

export const ChatContainer = styled.div < { $open?: boolean } > `
  /* display: ${props => props.$open ? 'block' : 'none'}; */
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
`