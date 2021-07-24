
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

export enum CommentSortFields {
    active = "active",
    createdAt = "createdAt",
    id = "id",
    postId = "postId",
    text = "text",
    updatedAt = "updatedAt",
    userId = "userId"
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

export interface CommentFilter {
    active?: BooleanFieldComparison;
    and?: CommentFilter[];
    createdAt?: DateFieldComparison;
    id?: IDFilterComparison;
    or?: CommentFilter[];
    postId?: StringFieldComparison;
    text?: StringFieldComparison;
    updatedAt?: DateFieldComparison;
    userId?: StringFieldComparison;
}

export interface CommentSort {
    direction: SortDirection;
    field: CommentSortFields;
    nulls?: SortNulls;
}

export interface CreateCategoryInput {
    name: string;
}

export interface CreateCommentInput {
    postId: string;
    text?: string;
    userId: string;
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

export interface UpdateCategoryInput {
    name?: string;
}

export interface UpdateCommentInput {
    text?: string;
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

export interface Comment extends Base {
    active?: boolean;
    createdAt?: DateTime;
    id?: string;
    post: Post;
    postId?: string;
    text?: string;
    updatedAt?: DateTime;
    user: User;
    userId?: string;
}

export interface CommentConnection {
    edges: CommentEdge[];
    pageInfo: PageInfo;
}

export interface CommentEdge {
    cursor: ConnectionCursor;
    node: Comment;
}

export interface IMutation {
    addCategories(categoryIds: string[], postId: string): Category[] | Promise<Category[]>;
    createCategory(input: CreateCategoryInput): Category | Promise<Category>;
    createComment(input: CreateCommentInput): Comment | Promise<Comment>;
    createPost(input: CreatePostInput): Post | Promise<Post>;
    createUser(input: CreateUserInput): User | Promise<User>;
    deleteCategory(categoryId: string): Category | Promise<Category>;
    deleteComment(commentId: string): Comment | Promise<Comment>;
    deletePost(postId: string): Post | Promise<Post>;
    deleteUser(userId: string): User | Promise<User>;
    disableCategory(categoryId: string): Category | Promise<Category>;
    disableComment(commentId: string): Comment | Promise<Comment>;
    disablePost(postId: string): Post | Promise<Post>;
    disableUser(userId: string): User | Promise<User>;
    enableCategory(categoryId: string): Category | Promise<Category>;
    enableComment(commentId: string): Comment | Promise<Comment>;
    enablePost(postId: string): Post | Promise<Post>;
    enableUser(userId: string): User | Promise<User>;
    login(input: LoginInput): TokenModel | Promise<TokenModel>;
    removeCategories(categoryIds: string[], postId: string): Category[] | Promise<Category[]>;
    updateCategory(categoryId: string, input: UpdateCategoryInput): Category | Promise<Category>;
    updatePost(input: UpdatePostInput, postId: string): Post | Promise<Post>;
    updateUser(input: UpdateUserInput, userId: string): User | Promise<User>;
    updatedComment(commentId: string, input: UpdateCommentInput): Comment | Promise<Comment>;
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
    comments: CommentConnection;
    createdAt?: DateTime;
    description?: string;
    id?: string;
    imageUrl?: string;
    title?: string;
    updatedAt?: DateTime;
    user: User;
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
    categories(filter?: CategoryFilter, paging?: CursorPaging, sorting?: CategorySort[]): CategoryConnection | Promise<CategoryConnection>;
    category(categoryId: string): Category | Promise<Category>;
    comment(commentId: string): Comment | Promise<Comment>;
    comments(filter?: CommentFilter, paging?: CursorPaging, sorting?: CommentSort[]): CommentConnection | Promise<CommentConnection>;
    me(): User | Promise<User>;
    post(postId: string): Post | Promise<Post>;
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
    comments: PostConnection;
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
