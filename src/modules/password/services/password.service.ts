import { Injectable } from '@nestjs/common'

import * as bcryptjs from 'bcryptjs'

/**
 * The class that represents the service that deals with the password
 * encryption and comparing logic
 */
@Injectable()
export class PasswordService {
  /**
   * Method that can encrypt some password
   *
   * @param password stores the password that will be encrypted
   */
  public async encryptPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt()
    return await bcryptjs.hash(password, salt)
  }

  /**
   * Method that can compare two passwords
   *
   * @param password stores the password that the user is passing
   * @param hashedPassword stores the hashed password in the database
   */
  public async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(password, hashedPassword)
  }
}
