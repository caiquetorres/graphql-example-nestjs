import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'

import { EnvService } from '../../modules/env/services/env.service'

import { join } from 'path'

/**
 * The class that represents the service that deals with the graphql
 * configuration
 */
@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  public constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new configuration for the graphql
   *
   * @returns an object with all the configurations
   */
  public createGqlOptions(): GqlModuleOptions {
    return {
      debug: this.envService.get('GQL_DEBUG'),
      playground: this.envService.get('GQL_PLAYGROUND'),
      sortSchema: this.envService.get('GQL_SORT_SCHEMA'),
      autoSchemaFile: join(
        process.cwd(),
        this.envService.get('GQL_AUTO_SCHEMA_FILE'),
      ),
      definitions: {
        path: join(process.cwd(), this.envService.get('GQL_DEFINITIONS_PATH')),
        outputAs: this.envService.get('GQL_DEFINITIONS_OUTPUT_AS'),
      },
      context: ({ req, connection }) =>
        connection ? { req: connection.context } : { req },
    }
  }
}
