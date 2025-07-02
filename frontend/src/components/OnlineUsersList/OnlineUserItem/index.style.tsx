import styled from 'styled-components'

export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .2s;
  border-radius: 8px;

  padding: .25rem;

  &:hover {
    background-color: #ffffff08;
  }
`

export const Username = styled.div`
  font-size: 1rem;
  margin: 0 auto;
`
export const UserProfilePicture = styled.img<{ $isOnlineUser: boolean }>`
  width: 1.75rem;
  border-radius: 100%;
  ${props => props.$isOnlineUser && `
    outline: 2px solid green
  `}
`