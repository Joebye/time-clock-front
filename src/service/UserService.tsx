import User from "../model/User";

export default interface UserService {
    addUserData(user: User): Promise<User|string>;
    getUserData(tz: string): Promise<User[]|string>;
}