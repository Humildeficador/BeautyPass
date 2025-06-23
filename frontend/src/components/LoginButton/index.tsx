import { GoogleLogin } from '@react-oauth/google'
import { loginWithGoogle } from '../../api/auth'
import { useAuth } from '../../context/AuthContext'
import { ButtonToPrivateRoute } from '../ButtonToPrivateRoute'

export const LoginButton = () => {
  const { login, isLoggedIn, logout } = useAuth()

  if (isLoggedIn) {
    return (
      <>
        <p>Você já está logado!</p>
        <button onClick={logout}>Deslogar</button>
        <ButtonToPrivateRoute />
      </>
    )
  }

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        if (credentialResponse.credential) {
          try {
            const data = await loginWithGoogle(credentialResponse.credential)
            login(data.user, data.token)
          } catch (error) {
            console.error('Erro ao logar:', error)
          }
        }
      }}
    />
  )
}