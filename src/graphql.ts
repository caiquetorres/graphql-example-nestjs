
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum PostSortFields {
    active = "active",
    createdAt = "createdAt",
    description = "description",
    id = "id",
    title = "title",
    updatedAt = "updatedAt",
    userId = "userId"
}

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

export interface CreatePostInput {
    description: string;
    imageUrl?: string;
    title: string;
    userId: string;
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

export interface PostFilter {
    active?: BooleanFieldComparison;
    and?: PostFilter[];
    createdAt?: DateFieldComparison;
    description?: StringFieldComparison;
    id?: IDFilterComparison;
    or?: PostFilter[];
    title?: StringFieldComparison;
    updatedAt?: DateFieldComparison;
    userId?: IDFilterComparison;
}

export interface PostSort {
    direction: SortDirection;
    field: PostSortFields;
    nulls?: SortNulls;
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

export interface UpdatePostInput {
    description?: string;
    imageUrl?: string;
    title?: string;
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
    createPost(input: CreatePostInput): Post | Promise<Post>;
    createUser(input: CreateUserInput): User | Promise<User>;
    deletePost(postId?: string): Post | Promise<Post>;
    deleteUser(userId?: string): User | Promise<User>;
    disablePost(postId?: string): Post | Promise<Post>;
    disableUser(userId?: string): User | Promise<User>;
    enablePost(postId?: string): Post | Promise<Post>;
    enableUser(userId?: string): User | Promise<User>;
    login(input: LoginInput): TokenModel | Promise<TokenModel>;
    updatePost(input: UpdatePostInput, postId?: string): Post | Promise<Post>;
    updateUser(input: UpdateUserInput, userId?: string): User | Promise<User>;
}

export interface PageInfo {
    endCursor?: ConnectionCursor;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    startCursor?: ConnectionCursor;
}

export interface Post {
    active?: boolean;
    createdAt?: DateTime;
    description?: string;
    id: string;
    imageUrl?: string;
    title?: string;
    updatedAt?: DateTime;
    userId?: string;
}

export interface PostConnection {
    edges: PostEdge[];
    pageInfo: PageInfo;
}

export interface PostEdge {
    cursor: ConnectionCursor;
    node: Post;
}

export interface IQuery {
    me(): User | Promise<User>;
    post(postId?: string): Post | Promise<Post>;
    posts(filter?: PostFilter, paging?: CursorPaging, sorting?: PostSort[]): PostConnection | Promise<PostConnection>;
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
    posts: PostConnection;
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
