import AdminLayout from "../layout/admin-layout.tsx";
import CalendarComponent from "../components/calendar-component.tsx";

export default function AccountsAdmin() {

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-start w-full">
                <h1 className="text-2xl font-bold mb-6 text-text-primary">Calendario de Citas</h1>
                <CalendarComponent/>
            </div>
        </AdminLayout>
    );
}