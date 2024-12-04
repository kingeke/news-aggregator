import { logo } from '@/assets/pictures';
import { PrimaryButton } from '@/Components/Buttons';
import { PoweredBy } from '@/Components/Config/Helpers';
import FormLayout from '@/Components/Layouts/FormLayout';
import { Inputs } from '@/Components/Layouts/Inputs';
import { router } from '@inertiajs/react';
import { Typography } from '@mui/material';
import { useState } from 'react';

function ForgotPassword() {

    const [form, setForm] = useState({
        email: '',
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
        router.post(route('password.email'), form);
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
                                Forgot your password huh?
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                Just let us know your email address and we will email you a password reset link that will allow you to choose a new one, if you're who you think you are
                            </Typography>
                        </div>
                        <FormLayout handleSubmit={handleSubmit}>
                            {fields.email()}
                            <PrimaryButton className="my-1" fullWidth>
                                Email Password Reset Link
                            </PrimaryButton>
                            <PoweredBy />
                        </FormLayout>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;