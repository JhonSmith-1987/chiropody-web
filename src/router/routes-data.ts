import {lazy} from "react";

export const Login = lazy(() => import('../screens/login.tsx'));
export const AccountAdmin = lazy(() => import('../screens/accounts-admin.tsx'));
export const ApplicationsAdmin = lazy(() => import('../screens/applications-admin.tsx'));
export const RechargeAccountAdmin = lazy(() => import('../screens/recharge-account-admin.tsx'));
export const PaymentTransactionAdmin = lazy(() => import('../screens/payment-transaction-admin.tsx'));
export const CreditorsAdmin = lazy(() => import('../screens/creditors-admin.tsx'));
export const SingleCreditorAdmin = lazy(() => import('../screens/single-creditor-admin.tsx'));


export const SessionEnded = lazy(() => import('../screens/session-ended.tsx'));
export const InternalServerError = lazy(() => import('../screens/internal-server-error.tsx'));
export const NotFound = lazy(() => import('../screens/not-found'));