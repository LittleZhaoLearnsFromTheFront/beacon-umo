import { ReactNode } from 'react';
import {
    loginPath,
    templatesPath,
    usersPath
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
    {
        name: '模版列表',
        path: templatesPath,
        component: routerPath2filePath(templatesPath),
        icon: 'AppstoreOutlined'
    },
    {
        name: '用户管理',
        path: usersPath,
        component: routerPath2filePath(usersPath),
        icon: 'UserOutlined'
    }
];
