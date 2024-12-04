import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import { Person } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import CustomTabs from '@/Components/Layouts/CustomTabs';

export default function Edit({
    authUser,
}) {

    let tabs = [
        {
            title: "Account",
            key: 'account',
            show: true
        },
    ];

    tabs = tabs.filter(i => i.show);

    let currentTab = route().params?.tab ? tabs.find((i) => i.key == route().params?.tab)?.key : null;

    const [tabValue, setTabValue] = useState(currentTab || tabs[0]?.key);

    useEffect(() => {
        if (route().params?.tab && route().params?.tab != tabValue) {

            setTabValue(route().params?.tab);
        }
    }, [route().params?.tab]);

    return (
        <AuthenticatedLayout
            title="Profile"
            icon={<Person />}
            showBack={false}
        >
            <CustomTabs
                tabs={tabs}
                tabValue={tabValue}
                setTabValue={setTabValue}
            />
            {
                tabValue == 'account' &&
                <div className='col-xl-5 col-lg-8'>

                    <UpdatePasswordForm />
                </div>
            }
        </AuthenticatedLayout>
    );
}
