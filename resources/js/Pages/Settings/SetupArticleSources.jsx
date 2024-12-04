import { logo } from '@/assets/pictures';
import { PrimaryButton } from '@/Components/Buttons';
import { PoweredBy } from '@/Components/Config/Helpers';
import ErrorField from '@/Components/Layouts/ErrorField';
import FormLayout from '@/Components/Layouts/FormLayout';
import { Inputs } from '@/Components/Layouts/Inputs';
import { router } from '@inertiajs/react';
import { TextField, Typography } from '@mui/material';
import { Fragment, useState } from 'react';

function SetupArticleSources({
    isProduction,
    articleSources
}) {

    const [form, setForm] = useState({
        articleSources: [],
        apiKeys: {}
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setForm(old => ({
            ...old,
            [name]: value
        }));
    };

    const handleApiKeyChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        let apiKeys = form.apiKeys

        apiKeys[name] = value

        setForm((old) => ({
            ...old,
            apiKeys
        }))
    };

    const handleSubmit = () => {
        router.post(route('settings.store_article_sources'), form, {
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
                                Before we start we need you to setup your API News sources
                            </Typography>
                        </div>
                        {
                            isProduction ?
                                <Fragment>
                                    <p className="my-3">
                                        Please update .env file with the news sources keys
                                    </p>
                                </Fragment>
                                :
                                <Fragment>
                                    <FormLayout handleSubmit={handleSubmit}>
                                        <div className="form-group">
                                            {
                                                fields.customAutoComplete({
                                                    label: 'API News Sources',
                                                    name: 'articleSources',
                                                    options: articleSources || [],
                                                    required: true,
                                                    value: articleSources?.filter((i) => form?.articleSources?.includes(i.value)),
                                                    getOptionLabel: (item) => item?.label || '',
                                                    multiple: true,
                                                    valueKey: 'value'
                                                })
                                            }
                                            <ErrorField name="articleSources" />
                                        </div>
                                        {
                                            articleSources?.filter((i) => form?.articleSources?.includes(i?.value))?.map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <div className="form-group">
                                                            <TextField
                                                                onChange={handleApiKeyChange}
                                                                value={form?.apiKeys?.[item?.env_key] || ''}
                                                                name={item?.env_key}
                                                                label={item?.env_key}
                                                                helperText={
                                                                    <Fragment>
                                                                        You can get a key here{' '}
                                                                        <a href={item?.sign_up_page} target="_blank" rel="noopener noreferrer">
                                                                            {item?.sign_up_page}
                                                                        </a>
                                                                    </Fragment>
                                                                }
                                                                fullWidth
                                                                required
                                                            />
                                                        </div>
                                                    </Fragment>
                                                );
                                            })
                                        }
                                        <PrimaryButton className="my-1" fullWidth>
                                            Update
                                        </PrimaryButton>
                                        <PoweredBy />
                                    </FormLayout>
                                </Fragment>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetupArticleSources;