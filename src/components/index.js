import currencyFormat from '@/components/currencyFormat.vue'

const components = (Vue) => {
    Vue.component('v-currency-input', currencyFormat);
}

export default components;