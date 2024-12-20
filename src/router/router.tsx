import {Toaster} from "react-hot-toast";
import {Route, Routes} from "react-router-dom";
import LoadSuspense from "../components/load-suspense.tsx";
import {Suspense} from "react";
import {
    Login,
    AccountAdmin,
    ApplicationsAdmin,
    RechargeAccountAdmin,
    PaymentTransactionAdmin,
    CreditorsAdmin,
    SingleCreditorAdmin,
    SessionEnded,
    InternalServerError,
    NotFound,
} from './routes-data.ts';

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
                    <Route path="/admin/applications" Component={ApplicationsAdmin}/>
                    <Route path="/admin/recharge_Account" Component={RechargeAccountAdmin}/>
                    <Route path="/admin/payment_transaction" Component={PaymentTransactionAdmin}/>
                    <Route path="/admin/creditors" Component={CreditorsAdmin}/>
                    <Route path="/admin/single_creditor/:creditor_id" Component={SingleCreditorAdmin}/>

                    <Route path="/admin/session_ended" Component={SessionEnded}/>
                    <Route path="/admin/server_error" Component={InternalServerError}/>
                    <Route path="*" Component={NotFound}/>
                </Routes>
            </Suspense>
        </div>
    );
}