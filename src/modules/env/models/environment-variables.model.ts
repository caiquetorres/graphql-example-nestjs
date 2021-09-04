import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsIn,
  IsNumber,
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

  @IsOptional()
  @IsNumber({}, { message: 'It is required to send a number value' })
  public PORT?: number

  @IsDefined({ message: 'It is required to set the "PACKAGE_VERSION"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public PACKAGE_VERSION: string

  //#region GraphQL

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  public GQL_DEBUG?: boolean

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  public GQL_PLAYGROUND?: boolean

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public GQL_AUTO_SCHEMA_FILE?: string

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  public GQL_SORT_SCHEMA?: boolean

  @IsOptional()
  @IsArray({ message: 'It is required to send an array' })
  public GQL_TYPE_PATHS?: string[]

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public GQL_DEFINITIONS_PATH?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  @IsIn(['class', 'interface'])
  public GQL_DEFINITIONS_OUTPUT_AS?: 'class' | 'interface'

  //#endregion

  //#region Database

  @IsDefined({ message: 'It is required to set the "DATABASE_TYPE"' })
  @IsString({ message: 'It is required to send a valid string value' })
  @IsIn(['mysql', 'postgres', 'sqlite'])
  public DATABASE_TYPE: 'mysql' | 'postgres' | 'sqlite'

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public DATABASE_URL?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public DATABASE_DATABASE?: string

  @IsOptional()
  @IsNumber({}, { message: 'It is required to send a number value' })
  public DATABASE_PORT?: number

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public DATABASE_HOST?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public DATABASE_USERNAME?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  public DATABASE_PASSWORD?: string

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  public DATABASE_SYNCHRONIZE?: boolean

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  public DATABASE_MIGRATIONS_RUN?: boolean

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  public DATABASE_SSL?: boolean

  //#endregion

  //#region JWT

  @IsDefined({ message: 'It is required to set the "JWT_SECRET_KEY"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public JWT_SECRET_KEY: string

  @IsDefined({ message: 'It is required to set the "JWT_EXPIRES_IN"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public JWT_EXPIRES_IN: string

  //#endregion

  //#region i18n

  @IsDefined({ message: 'It is required to set the "I18N_FALLBACK_LANGUAGE"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public I18N_FALLBACK_LANGUAGE: string

  //#endregion

  //#region Sentry

  @IsDefined({ message: 'It is required to set the "SENTRY_DSN"' })
  @IsString({ message: 'It is required to send a valid string value' })
  @IsUrl({}, { message: 'It is required to send a valid url value' })
  public SENTRY_DSN: string

  //#endregion

  //#region Google Sign In

  @IsDefined({ message: 'It is required to set the "GOOGLE_CLIENT_ID"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public GOOGLE_CLIENT_ID: string

  @IsDefined({ message: 'It is required to set the "GOOGLE_CLIENT_SECRET"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public GOOGLE_CLIENT_SECRET: string

  //#region

  @IsDefined({ message: 'It is required to set the "FACEBOOK_CLIENT_ID"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public FACEBOOK_CLIENT_ID: string

  @IsDefined({ message: 'It is required to set the "FACEBOOK_CLIENT_SECRET"' })
  @IsString({ message: 'It is required to send a valid string value' })
  public FACEBOOK_CLIENT_SECRET: string

  //#endregion

  //#endregion
}
