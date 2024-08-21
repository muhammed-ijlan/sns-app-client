import { Helmet } from 'react-helmet-async';
import RegisterView from '../components/RegisterView';


// ----------------------------------------------------------------------

export default function RegisterPage() {
    return (
        <>
            <Helmet>
                <title> Login | StackArch </title>
            </Helmet>

            <RegisterView />
        </>
    );
}
