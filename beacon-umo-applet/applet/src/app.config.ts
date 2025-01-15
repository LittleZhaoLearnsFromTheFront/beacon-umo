export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/login/index',
    'pages/validate-template/index'
  ],
  subPackages: [
    {
      root: "recipe-sub",
      pages: [
        'home/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '小仙女工坊',
    navigationBarTextStyle: 'black',
  }
})
