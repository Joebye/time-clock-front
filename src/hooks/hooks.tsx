import { useEffect, useState } from "react";
import { useSelectorUser } from "../redux/store";
import { userService } from "../config/service-config";
import User from "../model/User";

export function useSelectorDataByCurUser() {
    const curUserRedux = useSelectorUser();
    const curUserTz = curUserRedux.teudatZeut;
    const [userData, setUserData] = useState<User[] | string>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: User[] | string = await userService.getUserData(curUserTz);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchData();
    }, [curUserTz]);

    useEffect(() => {
        const savedData = localStorage.getItem(curUserTz);
        if (savedData) {
            const parsedSavedData: User[] = JSON.parse(savedData);
            if (Array.isArray(userData) && userData.length > 0) {
                if (userData.length !== parsedSavedData.length) {
                    localStorage.setItem(curUserTz, JSON.stringify(userData));
                }
            } else {
                setUserData(parsedSavedData);
            }
        } else {
            if (Array.isArray(userData) && userData.length > 0) {
                localStorage.setItem(curUserTz, JSON.stringify(userData));
            }
        }
    }, [curUserTz, userData]);
    return userData;
} 