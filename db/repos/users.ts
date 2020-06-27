import {IDatabase, IMain} from 'pg-promise';
import User from '../models/user';
import {users as sql} from '../sql';

export class UserRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {
    }

    async create(values: {username: string, email:string, password_hash: string}): Promise<User | null> {
        return this.db.oneOrNone(sql.create, {
            username: values.username,
            email: values.email,
            password_hash: values.password_hash
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.db.oneOrNone(sql.findByEmail, {
            email: email
        })
    }
}