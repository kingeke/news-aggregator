import { PrimaryButton } from '@/Components/Buttons';
import FormLayout from '@/Components/Layouts/FormLayout';
import { Inputs } from '@/Components/Layouts/Inputs';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdatePasswordForm() {

    const [form, setForm] = useState({
        current_password: '',
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

    const handelSubmit = () => {
        router.put(route('password.update'), form);
    };

    let fields = Inputs({ form, handleChange });

    return (
        <div>
            <h4>Update Password</h4>
            <p>
                Ensure your account is using a long, random password to stay secure.
            </p>

            <FormLayout handleSubmit={handelSubmit}>
                {
                    fields.password({
                        inputName: 'current_password',
                        label: 'Current Password'
                    })
                }
                {
                    fields.password()
                }
                {
                    fields.passwordConfirmation()
                }

                <PrimaryButton>Save</PrimaryButton>
            </FormLayout>
        </div>
    );
}
