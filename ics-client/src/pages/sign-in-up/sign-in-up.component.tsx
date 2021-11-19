import LogIn from '../../components/log-in/log-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import './sign-in-up.styles.scss';

const SignInUpPage = () => {
    return (
        <div>
            <SignUp />
            <LogIn />
        </div>
    )
}

export default SignInUpPage