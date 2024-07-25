import { Box, Stack } from "@mui/material"
import { useState } from "react";
import User from "../model/User";
import moment from 'moment';
import {userService} from '../config/service-config'
import ActionButton from "../components/ActionButton";
import { useSelectorUser } from "../redux/store";

const Actions: React.FC = () => {
const [active, setActive] = useState(1);
const curUser = useSelectorUser();
const userId = curUser.teudatZeut;
const userPass = curUser.password;

const newUSer: User = {
    teudatZeut: userId,
    password: userPass
};

const [user, setNewUser] = useState<User>(newUSer)

const handleClickFn = async (button: number) => {
    const updUser = {...user};

    switch (button) {
        case 1:
            setActive(2);
            updUser.entry = moment().format('HH:mm');
            break;
        case 2:
            setActive(3);
            updUser.startBreak = moment().format('HH:mm');
            break;
        case 3:
            setActive(4);
            updUser.endBreak = moment().format('HH:mm');
            break;
        case 4:
            setActive(5);
            updUser.exit = moment().format('HH:mm');
            break;
        case 5:
            setActive(1);
            await userService.addUserData(updUser);
            break;
        default:
            break;
    }

    setNewUser(updUser);
};

return <Box> <Stack margin={7} spacing={5} direction="row">
<ActionButton type={"entry"} activeNum={active !=1} handleClickFn={() => handleClickFn(1)}/>
<ActionButton type={"startBreak"} activeNum={active !=2} handleClickFn={() =>handleClickFn(2)}/>
<ActionButton type={"endBreak"} activeNum={active !=3} handleClickFn={() =>handleClickFn(3)}/>
<ActionButton type={"exit"} activeNum={active !=4} handleClickFn={() =>handleClickFn(4)}/>
</Stack> 
<Box ml={37}>
<ActionButton type={"submit"} activeNum={active !=5} handleClickFn={() =>handleClickFn(5)}/>
</Box>   
</Box>

}

export default Actions;