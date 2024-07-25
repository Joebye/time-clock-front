import { Button } from "@mui/material";
import buttonConf from "../config/action-buttons-config" 

type ButtonType = keyof typeof buttonConf;

interface ActionButtonProps {
    type: ButtonType;
    activeNum: boolean;
    handleClickFn: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
const config = buttonConf[props.type];
return <Button sx={{borderRadius: '20px'}} size="large" name="entry" variant="contained" disabled={props.activeNum} 
color={config.color} onClick={props.handleClickFn}>{config.name}</Button>
}

export default ActionButton;