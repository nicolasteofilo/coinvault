import { SHA256 as sha256 } from 'crypto-js'

export const hashPassword = (str: string) => {
  return sha256(str).toString()
}
