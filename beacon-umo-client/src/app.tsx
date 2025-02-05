import { ConfigProvider, message, Tooltip } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { antdProThemeToken, antdThemeToken } from './themeToken';
import { ReactElement } from 'react';
import zhCN from 'antd/locale/zh_CN';
import Home from './Home';
import { siderWidth } from './constants';
import { userService } from './servicesWrap';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  const info = await userService.apiInfoGet()
  return info;
}

export const layout = () => {
  return {
    title: '小仙女工坊',
    siderWidth: siderWidth,
    layout: 'mix',
    menuHeaderRender: false, // 自带的 logo 和 title
    defaultCollapsed: false,
    collapsedButtonRender: false,
    disableMobile: true,
    menuRender: ({ }, dom: any) => <div className='fixed z-10'>{dom}</div>,
    headerRender: () => <div></div>,
    collapsed: false,
    contentStyle: {
      width: `calc(100vw - ${siderWidth})`,
      padding: 0,
      paddingLeft: siderWidth,
    },
    breakpoint: false as false,
    menuFooterRender: () => (
      <div className='h-12 text-center flex text-xs justify-around items-center'>
        <Tooltip
          title='15631231958'
          className='svip-hover-primary-color cursor-pointer'
        >
          <PhoneOutlined rotate={110} /> 咨询电话
        </Tooltip>
      </div>
    ),
    token: antdProThemeToken,

  };
};

export function onRouteChange() {
  message.destroy();
}
export function rootContainer(root: ReactElement) {
  return (
    <ConfigProvider locale={zhCN} theme={antdThemeToken}>
      <Home>{root}</Home>
    </ConfigProvider>
  );
}
