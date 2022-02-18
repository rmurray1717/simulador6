import Vue from 'vue';
import BootstrapVue from "bootstrap-vue"
import App from '@/App.vue';
import router from '@/router.js';
import Library from '@/libs.js';

import component from './components/index.js'

Vue.use(BootstrapVue)

// Global libs
Vue.use(Library);
Vue.use(component);

// Disabled warnings
Vue.config.productionTip = false;
console.log(router)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');