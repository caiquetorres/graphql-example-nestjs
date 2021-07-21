
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum CategorySortFields {
    active = "active",
    createdAt = "createdAt",
    id = "id",
    name = "name",
    updatedAt = "updatedAt"
}

export enum PostCategorySortFields {
    active = "active",
    createdAt = "createdAt",
    id = "id",
    updatedAt = "updatedAt"
}

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

export interface CategoryFilter {
    active?: BooleanFieldComparison;
    and?: CategoryFilter[];
    createdAt?: DateFieldComparison;
    id?: IDFilterComparison;
    name?: StringFieldComparison;
    or?: CategoryFilter[];
    updatedAt?: DateFieldComparison;
}

export interface CategorySort {
    direction: SortDirection;
    field: CategorySortFields;
    nulls?: SortNulls;
}

export interface CreateCategoryInput {
    name: string;
}

export interface CreatePostCategoryInput {
    categoryId: string;
    postId: string;
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

export interface PostCategoryFilter {
    active?: BooleanFieldComparison;
    and?: PostCategoryFilter[];
    createdAt?: DateFieldComparison;
    id?: IDFilterComparison;
    or?: PostCategoryFilter[];
    updatedAt?: DateFieldComparison;
}

export interface PostCategorySort {
    direction: SortDirection;
    field: PostCategorySortFields;
    nulls?: SortNulls;
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

export interface UpdateCategoryInput {
    name?: string;
}

export interface UpdatePostCategoryInput {
    categoryId: string;
    postId: string;
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

export interface Base {
    active?: boolean;
    createdAt?: DateTime;
    id?: string;
    updatedAt?: DateTime;
}

export interface Category extends Base {
    active?: boolean;
    createdAt?: DateTime;
    id?: string;
    name: string;
    posts: PostConnection;
    updatedAt?: DateTime;
}

export interface CategoryConnection {
    edges: CategoryEdge[];
    pageInfo: PageInfo;
}

export interface CategoryEdge {
    cursor: ConnectionCursor;
    node: Category;
}

export interface IMutation {
    createCategory(input: CreateCategoryInput): Category | Promise<Category>;
    createPost(input: CreatePostInput): Post | Promise<Post>;
    createPostCategory(input: CreatePostCategoryInput[]): PostCategory | Promise<PostCategory>;
    createUser(input: CreateUserInput): User | Promise<User>;
    deleteCategory(categoryId: string): Category | Promise<Category>;
    deletePost(postId: string): Post | Promise<Post>;
    deletePostCategory(postCategoryId: string): PostCategory | Promise<PostCategory>;
    deleteUser(userId: string): User | Promise<User>;
    disableCategory(categoryId: string): Category | Promise<Category>;
    disablePost(postId: string): Post | Promise<Post>;
    disablePostCategoryId(postCategoryId: string): PostCategory | Promise<PostCategory>;
    disableUser(userId: string): User | Promise<User>;
    enableCategory(categoryId: string): Category | Promise<Category>;
    enablePost(postId: string): Post | Promise<Post>;
    enablePostCategory(postCategoryId: string): PostCategory | Promise<PostCategory>;
    enableUser(userId: string): User | Promise<User>;
    login(input: LoginInput): TokenModel | Promise<TokenModel>;
    updateCategory(categoryId: string, input: UpdateCategoryInput): Category | Promise<Category>;
    updatePost(input: UpdatePostInput, postId: string): Post | Promise<Post>;
    updatePostCategory(input: UpdatePostCategoryInput, postCategoryId: string): PostCategory | Promise<PostCategory>;
    updateUser(input: UpdateUserInput, userId: string): User | Promise<User>;
}

export interface PageInfo {
    endCursor?: ConnectionCursor;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    startCursor?: ConnectionCursor;
}

export interface Post extends Base {
    active?: boolean;
    categories: CategoryConnection;
    createdAt?: DateTime;
    description?: string;
    id?: string;
    imageUrl?: string;
    title?: string;
    updatedAt?: DateTime;
    user: User;
    userId?: string;
}

export interface PostCategory extends Base {
    active?: boolean;
    createdAt?: DateTime;
    id?: string;
    updatedAt?: DateTime;
}

export interface PostCategoryConnection {
    edges: PostCategoryEdge[];
    pageInfo: PageInfo;
}

export interface PostCategoryEdge {
    cursor: ConnectionCursor;
    node: PostCategory;
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
    categories(filter?: CategoryFilter, paging?: CursorPaging, sorting?: CategorySort[]): CategoryConnection | Promise<CategoryConnection>;
    category(categoryId: string): Category | Promise<Category>;
    me(): User | Promise<User>;
    post(postId: string): Post | Promise<Post>;
    postCategories(filter?: PostCategoryFilter, paging?: CursorPaging, sorting?: PostCategorySort[]): PostCategoryConnection | Promise<PostCategoryConnection>;
    postCategory(postCategoryId: string): PostCategory | Promise<PostCategory>;
    posts(filter?: PostFilter, paging?: CursorPaging, sorting?: PostSort[]): PostConnection | Promise<PostConnection>;
    user(userId: string): User | Promise<User>;
    users(filter?: UserFilter, paging?: CursorPaging, sorting?: UserSort[]): UserConnection | Promise<UserConnection>;
}

export interface TokenModel {
    expiresIn: string;
    token: string;
}

export interface User extends Base {
    active?: boolean;
    createdAt?: DateTime;
    email?: string;
    id?: string;
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
