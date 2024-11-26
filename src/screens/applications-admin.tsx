import useAuthHook from "../hooks/use-auth-hook.tsx";
import LoadSuspense from "../components/load-suspense.tsx";
import {Navigate} from "react-router-dom";
import AdminLayout from "../layout/admin-layout.tsx";
import ApplicationListComponent from "../components/application-list-component.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "../hooks/store-hook.ts";
import {setNavSelected} from "../store/actions/util-actions.ts";

export default function ApplicationsAdmin() {

    const {isSession, load} = useAuthHook();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavSelected('/admin/applications'));
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
                    <div className="bg-gray-900 py-10">
                        <div className="px-4 sm:px-6 lg:px-8">

                            {/* button create account */}
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold text-white">
                                        Mis aplicaciones
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-300">
                                        Una lista de todos las aplicaciones.
                                    </p>
                                </div>
                            </div>
                            <ApplicationListComponent/>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}