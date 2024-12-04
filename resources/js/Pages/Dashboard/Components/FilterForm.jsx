import { formatDate } from '@/Components/Config/Helpers';
import { Inputs } from '@/Components/Layouts/Inputs';
import DateInput from '@/Components/Layouts/Inputs/DateInput';
import { router, usePage } from '@inertiajs/react';
import { Replay, Save, Search } from '@mui/icons-material';
import { IconButton, TextField, Tooltip } from '@mui/material';
import moment from "moment";
import { Fragment, useEffect, useState } from 'react';

function FilterForm() {

    const {
        authUser,
        categories,
        sources,
        authors
    } = usePage().props;

    let defaultForm = {
        from: moment().subtract('1', 'week').startOf('day').format('YYYY-MM-DD'),
        to: moment().endOf('day').format('YYYY-MM-DD'),
        keyword: '',
        categories: [],
        sources: [],
        authors: [],
    };

    const [reset, setReset] = useState(false);

    const [form, setForm] = useState({
        from: route().params?.from || defaultForm.from,
        to: route().params?.to || defaultForm.to,
        keyword: route().params?.keyword || '',
        categories: route().params?.categories?.split(',') || authUser?.preferred_categories || [],
        sources: route().params?.sources?.split(',') || authUser?.preferred_sources || [],
        authors: route().params?.authors?.split(',') || authUser?.preferred_authors || [],
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setForm(old => ({
            ...old,
            [name]: value
        }));
    };

    const handleDateChange = (date, name) => {
        setForm(old => ({
            ...old,
            [name]: formatDate({ date, withTime: false, format: "YYYY-MM-DD" })
        }));
    };

    const handleSubmit = (preserveState = true) => {

        let payload = {};

        Object.keys(form)?.map((item) => {
            if (Array.isArray(form[item])) {
                payload[item] = form[item].join(',');
            }
        });

        let data = { ...route().params, ...form, ...payload, page: 1 }

        router.visit(route('dashboard'), {
            data,
            preserveState,
            preserveScroll: true
        });
    };

    useEffect(() => {
        if (reset) {

            handleSubmit(false);

            setReset(false);
        }
    }, [reset]);

    const handleSave = () => {
        router.put(route("profile.update"), form, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: ({ props }) => {
                if (
                    Object.keys(props?.errors || {}).length == 0 &&
                    props?.notification?.status != 'danger'
                ) {
                    handleSubmit();
                }
            }
        });
    };

    const handleReset = () => {

        setForm(defaultForm);

        setReset(true);
    };

    let filters = [
        {
            title: 'Categories',
            name: 'categories',
            options: categories,
            show: true
        },
        {
            title: 'Sources',
            name: 'sources',
            options: sources,
            show: true
        },
        {
            title: 'Authors',
            name: 'authors',
            options: authors,
            show: true
        },
    ];

    let formFields = Inputs({ form, handleChange });

    return (
        <Fragment>
            <div className="row g-3 flex-wrap align-items-center">
                <div className="col-lg-3 col-md-6">
                    <div className="form-group">
                        <TextField
                            name="keyword"
                            label="Keyword"
                            fullWidth
                            value={form.keyword}
                            onChange={handleChange}
                        >
                        </TextField>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="form-group">
                        <DateInput
                            form={form}
                            handleDateChange={handleDateChange}
                            inputName="from"
                            label="Published From"
                            openTo='day'
                        />
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="form-group">
                        <DateInput
                            form={form}
                            handleDateChange={handleDateChange}
                            inputName="to"
                            label="Published To"
                            openTo='day'
                        />
                    </div>
                </div>
                {
                    filters?.filter(i => i.show).map((filter, index) => (
                        <div className="col-lg-3 col-md-6" key={index}>
                            <div className="form-group">
                                {
                                    formFields.customAutoComplete({
                                        label: filter.title,
                                        name: filter.name,
                                        options: filter.options,
                                        value: filter.options?.filter(i => form[filter.name]?.includes(i?.value)),
                                        getOptionLabel: (item) => item?.label || '',
                                        valueKey: 'value',
                                        multiple: true,
                                        limitTags: 1,
                                        variant: "standard",
                                        useCheckbox: false
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="d-flex">
                <Tooltip title="Filter">
                    <IconButton
                        onClick={handleSubmit}
                    >
                        <Search />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Reset">
                    <IconButton
                        onClick={handleReset}
                    >
                        <Replay />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Save Preference">
                    <IconButton
                        onClick={handleSave}
                    >
                        <Save />
                    </IconButton>
                </Tooltip>
            </div>
        </Fragment>
    );
}

export default FilterForm;