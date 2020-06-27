export default interface User {
    id: bigint;
    username: string;
    email: string;
    password_hash: string;
    created_on: Date;
    modified_on: Date
}
