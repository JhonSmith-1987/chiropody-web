import {Toaster} from "react-hot-toast";
import {Route, Routes} from "react-router-dom";
import LoadSuspense from "../components/load-suspense.tsx";
import {Suspense} from "react";
import {Login, AccountAdmin, NotFound} from './routes-data.ts';

export default function Router() {

    return (
        <div className="bg-gray-900">
            <Toaster
                position="bottom-left"
                reverseOrder={false}
                containerClassName="max-w-full overflow-hidden"
                toastOptions={{
                    className: 'text-white bg-red-500',
                }}
            />
            <Suspense fallback={ <LoadSuspense/> }>
                <Routes>
                    <Route path="/" Component={Login}/>
                    <Route path="/admin/accounts" Component={AccountAdmin}/>
                    <Route path="*" Component={NotFound}/>
                </Routes>
            </Suspense>
        </div>
    );
}