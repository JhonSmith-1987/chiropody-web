import {lazy} from "react";

export const Login = lazy(() => import('../screens/login.tsx'));
export const AccountAdmin = lazy(() => import('../screens/accounts-admin.tsx'));
export const ApplicationsAdmin = lazy(() => import('../screens/applications-admin.tsx'));
export const RechargeAccountAdmin = lazy(() => import('../screens/recharge-account-admin.tsx'));
export const ResolveTransactionAdmin = lazy(() => import('../screens/resolve-transaction-admin.tsx'));

export const NotFound = lazy(() => import('../screens/not-found'));