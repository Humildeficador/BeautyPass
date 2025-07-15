import { uid } from "uid"

export const createTempName = (email: string) => {
  return email.split('@')[0] + '_' + uid()
}