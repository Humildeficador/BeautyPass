import { GoogleLogin } from '@react-oauth/google'
import { loginWithGoogle } from '../../api/auth'
import { useAuth } from '../../context/AuthContext'

export const GoogleLoginButton = () => {
  const { login } = useAuth()

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
      auto_select={true}
      theme='filled_black'
      shape='circle'
    />
  )
}