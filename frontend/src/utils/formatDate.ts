export const formatDate = (str: string) => {
  const date = new Date(str)
  return `${date.getHours().toLocaleString().padStart(2, '0')}:${date.getMinutes().toLocaleString().padStart(2, '0')}`
}