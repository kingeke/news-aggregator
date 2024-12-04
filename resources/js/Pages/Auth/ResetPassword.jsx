import { logo } from '@/assets/pictures';
import { PrimaryButton } from '@/Components/Buttons';
import { PoweredBy } from '@/Components/Config/Helpers';
import FormLayout from '@/Components/Layouts/FormLayout';
import { Inputs } from '@/Components/Layouts/Inputs';
import { router } from '@inertiajs/react';
import { Typography } from '@mui/material';
import { useState } from 'react';

function ForgotPassword({
    token,
    email
}) {

    const [form, setForm] = useState({
        email,
        token,
        password: '',
        password_confirmation: '',
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
        router.post(route('password.store'), form);
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
                                Ahh you're real.. hmm interesting
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                alright, you're here now, so let's reset your password and get your right back in.
                            </Typography>
                        </div>
                        <FormLayout handleSubmit={handleSubmit}>
                            {fields.email({
                                readOnly: true
                            })}
                            {fields.password()}
                            {fields.passwordConfirmation()}
                            <PrimaryButton className="my-1" fullWidth>
                                Reset Password
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