import { ReactNode } from 'react';
import {
    loginPath
} from './constants';
import { concat } from 'ramda';

type Route = {
    label?: ReactNode;
    hideInMenu?: boolean;
    path: string;
    component: string;
    menuRender?: boolean;
    headerRender?: boolean;
    access?: string;
    icon?: string;
    name?: string;
    description?: string;
    routes?: Route[];
    hideChildrenInMenu?: boolean;
};

export const routerPath2filePath = concat('@/pages');

export const routes: Route[] = [
    {
        menuRender: false,
        headerRender: false,
        hideInMenu: true,
        name: '',
        path: '/',
        component: routerPath2filePath('/'),
    },
    {
        path: loginPath,
        component: routerPath2filePath(loginPath),
        menuRender: false,
        headerRender: false,
        hideInMenu: true,

    },
];
