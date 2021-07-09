
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export enum SortNulls {
    NULLS_FIRST = "NULLS_FIRST",
    NULLS_LAST = "NULLS_LAST"
}

export enum UserSortFields {
    active = "active",
    createdAt = "createdAt",
    email = "email",
    id = "id",
    name = "name",
    updatedAt = "updatedAt"
}

export interface BooleanFieldComparison {
    is?: boolean;
    isNot?: boolean;
}

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export interface CursorPaging {
    after?: ConnectionCursor;
    before?: ConnectionCursor;
    first?: number;
    last?: number;
}

export interface DateFieldComparison {
    between?: DateFieldComparisonBetween;
    eq?: DateTime;
    gt?: DateTime;
    gte?: DateTime;
    in?: DateTime[];
    is?: boolean;
    isNot?: boolean;
    lt?: DateTime;
    lte?: DateTime;
    neq?: DateTime;
    notBetween?: DateFieldComparisonBetween;
    notIn?: DateTime[];
}

export interface DateFieldComparisonBetween {
    lower: DateTime;
    upper: DateTime;
}

export interface IDFilterComparison {
    eq?: string;
    gt?: string;
    gte?: string;
    iLike?: string;
    in?: string[];
    is?: boolean;
    isNot?: boolean;
    like?: string;
    lt?: string;
    lte?: string;
    neq?: string;
    notILike?: string;
    notIn?: string[];
    notLike?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface StringFieldComparison {
    eq?: string;
    gt?: string;
    gte?: string;
    iLike?: string;
    in?: string[];
    is?: boolean;
    isNot?: boolean;
    like?: string;
    lt?: string;
    lte?: string;
    neq?: string;
    notILike?: string;
    notIn?: string[];
    notLike?: string;
}

export interface UpdateUserInput {
    name?: string;
}

export interface UserFilter {
    active?: BooleanFieldComparison;
    and?: UserFilter[];
    createdAt?: DateFieldComparison;
    email?: StringFieldComparison;
    id?: IDFilterComparison;
    name?: StringFieldComparison;
    or?: UserFilter[];
    updatedAt?: DateFieldComparison;
}

export interface UserSort {
    direction: SortDirection;
    field: UserSortFields;
    nulls?: SortNulls;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
    deleteUser(userId?: string): User | Promise<User>;
    disableUser(userId?: string): User | Promise<User>;
    enableUser(userId?: string): User | Promise<User>;
    login(input: LoginInput): TokenModel | Promise<TokenModel>;
    updateUser(input: UpdateUserInput, userId?: string): User | Promise<User>;
}

export interface PageInfo {
    endCursor?: ConnectionCursor;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    startCursor?: ConnectionCursor;
}

export interface IQuery {
    user(userId?: string): User | Promise<User>;
    users(filter?: UserFilter, paging?: CursorPaging, sorting?: UserSort[]): UserConnection | Promise<UserConnection>;
}

export interface TokenModel {
    expiresIn: string;
    token: string;
}

export interface User {
    active?: boolean;
    createdAt?: DateTime;
    email?: string;
    id: string;
    name?: string;
    permissions?: string;
    updatedAt?: DateTime;
}

export interface UserConnection {
    edges: UserEdge[];
    pageInfo: PageInfo;
}

export interface UserEdge {
    cursor: ConnectionCursor;
    node: User;
}

export type ConnectionCursor = any;
export type DateTime = any;
