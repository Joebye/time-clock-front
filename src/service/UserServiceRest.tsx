import User from "../model/User";
import UserService from "./UserService";
const SERVER_NOT_AVAILABLE = 'Server is unavailable, repeat later on';
const FAILED_ADD = 'Failed to add data: ';
const FAILED_GET = 'Failed to get data: ';

export default class UserServiceRest implements UserService {
    private urlService: string;
    constructor(baseUrl: string) {
        this.urlService = `http://${baseUrl}`
    }
    
    async addUserData(user: User): Promise<User|string> {
        try {
        const response = await fetch(`${this.urlService}/actions`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(FAILED_ADD + response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        throw SERVER_NOT_AVAILABLE;
    }
}


async getUserData(tz: string): Promise<User[]|string> {
    try {
        const response = await fetch(`${this.urlService}/history/${tz}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
           
    });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(FAILED_GET + response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        throw SERVER_NOT_AVAILABLE;
    }
}

}