import React, { Fragment, useState } from 'react';
import ErrorField from '../ErrorField';
import { usePage } from '@inertiajs/react';
import { Chip, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import NumberFormatCustom from '../Components/NumberFormatCustom';
import { formatNumber, inputDelay } from '@/Components/Config/Helpers';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function TextInput({
    form,
    handleChange,
    required = true,
    readOnly = false,
    disabled = false,
    inputName,
    label,
    isNumberFormat = false,
    multiline = false,
    minRows = 3,
    type = 'text',
    helperText,
    hasRegex = false,
    regexKey,
    minLength,
    maxLength,
    equalTo,
    min,
    max,
    sampleInputs,
    autoComplete
}) {

    const { regex_patterns } = usePage().props;

    const [inputType, setInputType] = useState(type);

    const [input, setInput] = React.useState(form[inputName] || '');

    const handleInputChange = (e) => {
        let value = e.target.value;
        setInput(value);
        handleChange(e);
    };

    React.useEffect(() => {
        if (form[inputName] !== null || form[inputName] !== '') {
            setInput(form[inputName]);
        }
    }, [form[inputName]]);

    // React.useEffect(() => {

    //     // let timeOut = setTimeout(() => {
    //     //     handleChange({
    //     //         target: {
    //     //             name: inputName,
    //     //             value: input
    //     //         }
    //     //     });
    //     // }, inputDelay);

    //     // return () => {
    //     //     clearTimeout(timeOut);
    //     // };

    //     handleChange({
    //         target: {
    //             name: inputName,
    //             value: input
    //         }
    //     });

    // }, [input]);

    const handleShowPassword = () => {

        if (inputType == 'password') {

            setInputType('text');

        } else {

            setInputType(type);
        }
    };

    let inputProps = {
        minLength,
        maxLength,
    };

    let InputProps = {
        readOnly,
        disabled,
    };

    if (type == 'password') {
        InputProps.endAdornment =
            <Fragment>
                <InputAdornment position="end">
                    <Tooltip title={inputType == "password" ? "Show Password" : "Hide Password"}>
                        <IconButton onClick={handleShowPassword}>
                            {inputType == "password" ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Tooltip>
                </InputAdornment>
            </Fragment>;
    }

    if (isNumberFormat) {
        InputProps.inputComponent = NumberFormatCustom;
    }

    if (hasRegex) {
        inputProps['data-parsley-pattern'] = regex_patterns?.[regexKey];
        inputProps['data-parsley-pattern-message'] = 'This should match the pattern expected.';
    }

    if (equalTo) {
        inputProps['data-parsley-equalto'] = `#${equalTo}`;
    }

    return (
        <div className="form-group">
            <TextField
                id={inputName}
                type={inputType}
                name={inputName}
                label={label}
                fullWidth
                variant={readOnly ? 'filled' : 'outlined'}
                required={required}
                value={input}
                onChange={handleInputChange}
                InputProps={InputProps}
                inputProps={inputProps}
                multiline={multiline}
                minRows={minRows}
                helperText={helperText}
                autoComplete={autoComplete}
            />
            {
                sampleInputs &&
                <div className='mt-2 mb-4 d-flex gap-1'>
                    {
                        sampleInputs?.map((i, index) => (
                            <Chip
                                key={index}
                                label={typeof i == 'number' ? formatNumber({ number: i }) : i}
                                onClick={() => setInput(i)}
                                size="small"
                                sx={{
                                    fontSize: "10px"
                                }}
                            />
                        ))
                    }
                </div>
            }
            {
                isNumberFormat &&
                <TextField
                    name={inputName}
                    type="number"
                    fullWidth
                    hidden
                    variant="outlined"
                    required={required}
                    value={input}
                    inputProps={{
                        step: 0.01,
                        min,
                        max,
                        'data-parsley-error-message': input && (parseFloat(input) < min ? `The minimum amount allowed is ${formatNumber({ number: min, withNaira: true })}.` : `This maximum amount allowed is ${formatNumber({ number: max, withNaira: true })}.`)
                    }}
                    onChange={handleInputChange}
                />
            }
            <ErrorField name={inputName} />
        </div>
    );
}

export default TextInput;
