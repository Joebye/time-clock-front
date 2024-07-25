import SignInForm from "../forms/SignInForm";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/slices/userSlice";
import User from "../model/User";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  function submitFn(userData: User) {
    const tzInputed = userData!.teudatZeut;
    const passInputed = userData!.password;

    let userObj: User = {
      teudatZeut: tzInputed,
      password: passInputed
    };

    dispatch(userActions.set(userObj));

  }
  return <SignInForm submitFn={submitFn}

  />

}

export default SignIn;