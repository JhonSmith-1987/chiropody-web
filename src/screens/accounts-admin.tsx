import AdminLayout from "../layout/admin-layout.tsx";
import CalendarComponent from "../components/calendar-component.tsx";
import useAuthHook from "../hooks/use-auth-hook.tsx";
import LoadSuspense from "../components/load-suspense.tsx";
import {Navigate} from "react-router-dom";

export default function AccountsAdmin() {

    const {isSession, load} = useAuthHook();

    if (load) {
        return <LoadSuspense/>;
    }

    if (!isSession) {
        return <Navigate to="/"/>;
    }

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-start w-full">
                <h1 className="text-2xl font-bold mb-6 text-text-primary">Calendario de Citas</h1>
                <CalendarComponent/>
            </div>
        </AdminLayout>
    );
}