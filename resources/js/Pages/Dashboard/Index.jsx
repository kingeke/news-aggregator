import { HomeIcon } from '@/Components/Icons';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import FilterForm from './Components/FilterForm';
import Articles from './Components/Articles';

export default function Index({
    authUser,
}) {

    return (
        <AuthenticatedLayout
            title="Home"
            icon={<HomeIcon />}
            showBack={false}
        >
            <h5>Welcome back {authUser?.name}</h5>
            <p className="text-black-50">Let's digest some articles</p>

            <div className="my-5">
                <FilterForm />
            </div>

            <div className="my-5">
                <Articles />
            </div>

        </AuthenticatedLayout>
    );
}
