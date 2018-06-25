// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from "vee-validate"
import App from './App'
import router from './router'
import FastClick from 'fastclick';
import zh from "vee-validate/dist/locale/zh_CN";
import {
  validateRules
} from "./plugins/validator";

import DatePicker from "./components/common/DaterPicker";
import {
  Style,
  Button,
  Checkbox,
  CheckboxGroup,
  CascadePicker,
  Popup,
  Toast,
  Picker,
  TimePicker,
  Dialog,
  createAPI
  // ... more
} from 'cube-ui'

console.log(Style);

createAPI(Vue, DatePicker, ["select", "cancel"], false);

// console.log(Style);


VeeValidate.Validator.localize({
  zh
})

const config = {
  locale: "zh",
  delay: 0,
  inject: true
};
// custom validator
Object.keys(validateRules).forEach(key => {
  VeeValidate.Validator.extend(key, validateRules[key].validate);

  // merge the validator messages
  Object.keys(validateRules[key].messages).forEach(locale => {
    VeeValidate.Validator.localize({
      [locale]: {
        messages: {
          [key]: validateRules[key].messages[locale]
        }
      }
    });
  });
});
// use vee-validator
Vue.use(VeeValidate, config);

Vue.use(Button);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Picker);
Vue.use(TimePicker);
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(CascadePicker);

// 配置
Vue.config.productionTip = false;
// 组件挂载
FastClick.attach(document.body);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
