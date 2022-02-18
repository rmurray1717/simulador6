 import VCalendar from 'v-calendar';
import moment from 'moment-timezone';
import VueMoment from 'vue-moment';
function fire(Vue){
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});
    Vue.use(VueMoment, {
        moment
    });

}
// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(fire)
}


export default fire;