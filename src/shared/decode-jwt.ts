export const decodeJwt = <T>(token: string): T | null => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]))

    return decoded as T
  } catch (error) {
    console.error('Invalid token: ', error)

    new Error('Invalid token')
    return null
  }
}
