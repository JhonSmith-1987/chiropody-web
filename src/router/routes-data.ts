import {lazy} from "react";

export const Login = lazy(() => import('../screens/login.tsx'));
export const AccountAdmin = lazy(() => import('../screens/accounts-admin.tsx'));
export const ApplicationsAdmin = lazy(() => import('../screens/applications-admin.tsx'));

export const NotFound = lazy(() => import('../screens/not-found'));