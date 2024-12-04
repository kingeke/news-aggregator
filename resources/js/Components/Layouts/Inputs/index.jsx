import CustomAutoComplete from "./CustomAutoComplete";
import TextInput from "./TextInput";

export const Inputs = ({ form, handleChange, handleDateChange }) => {
    return {
        customAutoComplete: (props = {}) => (
            <CustomAutoComplete form={form} handleChange={handleChange} {...props} />
        ),
        email: (props = {}) => (
            <TextInput
                form={form}
                handleChange={handleChange}
                inputName="email"
                label="Email"
                type="email"
                {...props}
            />
        ),
        password: (props = {}) => (
            <TextInput
                form={form}
                handleChange={handleChange}
                inputName="password"
                label="Password"
                type="password"
                minLength={8}
                {...props}
            />
        ),
        passwordConfirmation: (props = {}) => (
            <TextInput
                form={form}
                handleChange={handleChange}
                inputName="password_confirmation"
                label="Confirm password"
                type="password"
                minLength={8}
                equalTo="password"
                {...props}
            />
        ),
        name: (props = {}) => (
            <TextInput
                form={form}
                handleChange={handleChange}
                inputName="name"
                label="Fullname"
                {...props}
            />
        ),
        textInput: (props = {}) => (
            <TextInput
                form={form}
                handleChange={handleChange}
                {...props}
            />
        ),
    };
};