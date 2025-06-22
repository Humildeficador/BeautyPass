import { api } from '../api/index'

export const PrivateRoute = () => {
  const privateRoute = async () => {
    const res = await api.get('/private')
    console.log(res)
  }
  return (
    <button onClick={privateRoute}>
      Acessar rota privada
    </button>
  )
}