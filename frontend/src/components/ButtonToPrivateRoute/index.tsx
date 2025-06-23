import { api } from '../../api/index'
import { useAuth } from '../../context/AuthContext'
import styles from './styles.module.scss'

export const ButtonToPrivateRoute = () => {
  const { logout } = useAuth()
  const getPrivateRoute = async () => {
    try {
      const res = await api.get('/private')
      console.log(res.data)
    } catch (error) {
      console.error(error)
      logout()
    }
  }
  return (
    <button onClick={getPrivateRoute} className={styles.button}>
      Acessar rota privada
    </button>
  )
}