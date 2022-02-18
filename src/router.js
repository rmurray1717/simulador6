import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
import principal from "@/pages/Principal.vue";
const router = new Router({
    mode: 'history', //URLS without #  
    //base: process.env.BASE_URL,
    routes: [
        {   
          name: 'Inicio' , path: '/simulador', component: principal,
        },
    ]
});

export default router;