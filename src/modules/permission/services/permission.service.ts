import { Injectable } from '@nestjs/common'

import { User } from 'src/modules/user/entities/user.entity'

import { RolesEnum } from 'src/models/enums/roles.enum'

/**
 * The class that represents the service that deals with the permissions
 */
@Injectable()
export class PermissionService {
  /**
   * Method that checks if some user has the permissions to execute some
   * action in the application
   *
   * @param targetUserId defines which user this entity or route is related to
   * @param currentUser defines and object that represents the user that is trying
   * to access some route or doing something related with the "targetUserId"
   * @returns true, if the user has the permissions, otherwise false
   */
  public hasPermission(targetUserId: string, currentUser: User): boolean {
    return this.isAdmin(currentUser) || targetUserId === currentUser.id
  }

  /**
   * Method that checks if the user has the "Admin" role
   *
   * @param currentUser defines and object that represents the user that is trying
   * to access some route or doing something related with the "targetUserId"
   * @returns true, if the user has the "Admin" role, otherwise false
   */
  private isAdmin(currentUser: User): boolean {
    return (
      currentUser && currentUser.roles && currentUser.roles === RolesEnum.Admin
    )
  }
}
