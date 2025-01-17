export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/login/index',
    'pages/validate-template/index',
    'pages/personal/index'
  ],
  subPackages: [
    {
      root: "recipe-sub",
      pages: [
        'home/index'
      ]
    }
  ],
  tabBar: {
    color: "#4D4D4D",
    selectedColor: "#E64342",
    backgroundColor: "#FFFFFF",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "assets/tabbar/home-not-select.png",
        selectedIconPath: "assets/tabbar/home-select.png"
      },
      {
        pagePath: "pages/personal/index",
        text: "我的",
        iconPath: "assets/tabbar/personal-not-select.png",
        selectedIconPath: "assets/tabbar/personal-select.png"
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '小仙女工坊',
    navigationBarTextStyle: 'black',
  }
})
