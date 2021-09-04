/**
 * Interface that represents the user result got after the sign in completed
 */
export interface FacebookUser {
  id: string
  name: string
  email: string
  picture: {
    data: {
      url: string
    }
  }
}
