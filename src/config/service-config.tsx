import UserService from "../service/UserService";
import UserServiceRest from "../service/UserServiceRest";

export const userService: UserService = new UserServiceRest('localhost:3500') 