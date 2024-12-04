import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Autocomplete, Checkbox, TextField } from '@mui/material';

function CustomAutoComplete({
    form,
    handleChange,
    name,
    options,
    required = false,
    label,
    readOnly = false,
    getOptionLabel,
    value,
    valueKey,
    inputProps,
    helperText,
    multiple = false,
    limitTags = 2,
    groupBy,
    variant = "outlined",
    useCheckbox = true
}) {
    return (
        <Autocomplete
            fullWidth
            limitTags={limitTags}
            value={value || form?.[name] || null}
            onChange={(e, value) => handleChange({ target: { name, value: (Array.isArray(value) ? value?.map(i => (i?.[valueKey] || i)) : (value?.[valueKey] || value)) } })}
            getOptionLabel={getOptionLabel || undefined}
            options={options}
            disabled={readOnly}
            groupBy={groupBy}
            multiple={multiple}
            disableCloseOnSelect={multiple}
            renderInput={(params) =>
                <TextField
                    {...params}
                    fullWidth
                    label={label}
                    required={required && (value?.length == 0 || !value)}
                    variant={variant}
                    helperText={helperText}
                    {...inputProps}
                />}
            renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        {
                            useCheckbox &&
                            <Checkbox
                                color="primary"
                                icon={<CheckBoxOutlineBlank fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                checked={selected}
                            />
                        }
                        {
                            getOptionLabel ? getOptionLabel(option) : option
                        }
                    </li>
                );
            }}
        />
    );
}

export default CustomAutoComplete;