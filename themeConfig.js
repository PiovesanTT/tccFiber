//@author Andrei


// CORES PRINCIPAIS
let colors = {
  primary : '#7367F0',
  success : '#28C76F',
  danger  : '#EA5455',
  warning : '#FF9F43',
  dark    : '#1E1E1E',
}

// CONFIGS
const themeConfig = {
  disableCustomizer : true,
  disableThemeTour  : true, 
  footerType        : "hidden",
  hideScrollToTop   : false, 
  mainLayoutType    : "vertical",
  navbarColor       : "#fff",
  navbarType        : "sticky",
  routerTransition  : "zoom-fade",
  rtl               : false,
  sidebarCollapsed  : false,
  theme             : "dark",


  userInfoLocalStorageKey: "userInfo",

}

import Vue from 'vue'
import Vuesax from 'vuesax'
Vue.use(Vuesax, { theme:{ colors }, rtl: themeConfig.rtl })

export default themeConfig
