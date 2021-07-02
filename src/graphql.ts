
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
}

export interface IMutation {
    createOneUser(input: CreateUserInput): User | Promise<User>;
}

export interface IQuery {
    getOneUser(id: string): User | Promise<User>;
}

export interface User {
    active?: boolean;
    createdAt?: DateTime;
    id: string;
    name?: string;
    updatedAt?: DateTime;
}

export type DateTime = any;
