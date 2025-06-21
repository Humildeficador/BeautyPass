import { GoogleLogin } from "@react-oauth/google"
import { loginWithGoogle } from "../api/auth"

export const LoginButton = () => {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        if (credentialResponse.credential) {
          try {
            const user = await loginWithGoogle(credentialResponse.credential)
            console.log('Usuário validado pelo backend:', user)
          } catch (error) {
            console.error('Erro ao logar:', error)
          }
        }
      }}
    />
  )
}