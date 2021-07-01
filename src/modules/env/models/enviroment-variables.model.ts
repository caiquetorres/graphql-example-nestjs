import {
  IsArray,
  IsBooleanString,
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

/**
 * The class that abstracts all the environments variables
 */
export class EnvironmentVariables {
  @IsDefined({ message: 'It is required to set the "NODE_ENV"' })
  @IsString({ message: 'It is required to send a valid string value' })
  @IsIn(['test', 'development', 'production'])
  public NODE_ENV: string

  @IsDefined({ message: 'It is required to send the "PACKAGE_VERSION"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public PACKAGE_VERSION: string

  //#region GraphQL

  @IsOptional()
  @IsBooleanString({ message: 'It is required to send a boolean value' })
  public GQL_PLAYGROUND = false

  @IsOptional()
  @IsBooleanString({ message: 'It is required to send a boolean value' })
  public GQL_DEBUG = false

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public GQL_AUTO_SCHEMA_FILE = 'src/schema.gql'

  @IsOptional()
  @IsBooleanString({ message: 'It is required to send a boolean value' })
  public GQL_SORT_SCHEMA = true

  @IsOptional()
  @IsArray({ message: 'It is required to send an array' })
  public GQL_TYPE_PATHS: string[] = ['./**/*.graphql']

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public GQL_DEFINITIONS_PATH = 'src/graphql.ts'

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  @IsIn(['class', 'interface'])
  public GQL_DEFINITIONS_OUTPUT_AS: 'class' | 'interface' = 'class'

  //#endregion

  //#region Sentry

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  @IsUrl({}, { message: 'It is required to send a valid url value' })
  public SENTRY_DSN: string

  //#endregion
}
