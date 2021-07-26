/**
 * Interface that represents the user result got after the sign in completed
 */
export interface GoogleUser {
  id: number | string
  email: string
  firstName: string
  lastName: string
}
