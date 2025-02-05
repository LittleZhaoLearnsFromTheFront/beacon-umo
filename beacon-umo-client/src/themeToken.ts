import {  primaryColor } from '@/constants';
//更改antd主题颜色等
export const antdThemeToken = {
  token: {
    //Seed Token，影响范围大
    colorPrimary: primaryColor,
    colorLink: primaryColor,
    colorInfo: primaryColor,
    borderRadius: 2,
  },
};
export const antdProThemeToken = {
  bgLayout: 'white',
  header: {
    heightLayoutHeader: 48,
    colorBgHeader: primaryColor,
  },
  sider: {
    colorTextMenuSelected: primaryColor,
    colorTextMenuItemHover: primaryColor,
    colorBgMenuItemSelected: 'rgb(255 243 240 / 1 )',
    colorTextMenuSecondary: '#000000d9',
  },
};
