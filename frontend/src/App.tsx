// import styles from './App.module.scss'
import { useEffect } from 'react'
import { api } from './api'
import { LoginButton } from './components/LoginButton'

export function App() {

  const teste = async () => {
    const data = await api.post('/', (req, res) => {
      return res
    })
    console.log(data)
  }

  useEffect(() => {
    teste()
  }, [])

  return (
    <>
      <LoginButton />
    </>
  )
}