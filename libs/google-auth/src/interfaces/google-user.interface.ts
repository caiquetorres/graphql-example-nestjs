/**
 * Interface that represents the user result got after the sign in completed
 */
export interface GoogleUser {
  id: number | string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}
