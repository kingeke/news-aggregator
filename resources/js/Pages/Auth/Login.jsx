import { logo } from '@/assets/pictures';
import { PrimaryButton } from '@/Components/Buttons';
import { PoweredBy } from '@/Components/Config/Helpers';
import FormLayout from '@/Components/Layouts/FormLayout';
import { Inputs } from '@/Components/Layouts/Inputs';
import { Link, router } from '@inertiajs/react';
import { Typography } from '@mui/material';
import { useState } from 'react';

function Login() {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setForm(old => ({
            ...old,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        router.post(route('login'), form, {
            preserveState: true
        });
    };

    const fields = Inputs({ form, handleChange });

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <div className="loginForm">
                        <div className="text-center mb-3">
                            {logo}
                            <Typography variant="h5" gutterBottom>
                                Welcome To News Aggregator
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                Please use your credentials to continue.
                            </Typography>
                        </div>
                        <FormLayout handleSubmit={handleSubmit}>
                            {fields.email()}
                            {fields.password()}
                            <PrimaryButton className="my-1" fullWidth>
                                Login
                            </PrimaryButton>
                            <div className='d-flex justify-content-between flex-wrap'>
                                <Link href={route('register')}>
                                    <small>Sign up?</small>
                                </Link>
                                <Link href={route('password.request')}>
                                    <small>Forgot Password?</small>
                                </Link>
                            </div>
                            <PoweredBy />
                        </FormLayout>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;