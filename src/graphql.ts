
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface IMutation {
    createOneUser(input: CreateUserInput): User | Promise<User>;
    login(input: LoginInput): TokenModel | Promise<TokenModel>;
}

export interface IQuery {
    getOneUser(id: string): User | Promise<User>;
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

export type DateTime = any;
