import useAuthHook from "../hooks/use-auth-hook.tsx";
import LoadSuspense from "../components/load-suspense.tsx";
import {Navigate} from "react-router-dom";
import AdminLayout from "../layout/admin-layout.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "../hooks/store-hook.ts";
import {setNavSelected} from "../store/actions/util-actions.ts";
import FormDataWompiComponent from "../components/form-data-wompi-component.tsx";

export default function RechargeAccountAdmin() {

    const {isSession, load} = useAuthHook();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavSelected('/admin/recharge_Account'));
    }, [dispatch]);

    if (load) {
        return <LoadSuspense/>;
    }

    if (!isSession) {
        return <Navigate to="/"/>;
    }

    return (
        <AdminLayout>
            <div className="bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl">
                    <div className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <FormDataWompiComponent/>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}