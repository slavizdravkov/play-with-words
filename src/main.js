import Vue from 'vue'
import App from './App.vue'

import { store } from "./store/store";

//Fontawesome
import {library} from "@fortawesome/fontawesome-svg-core";
import {faCalculator} from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faCalculator);
library.add(faTimes);
library.add(faTimesCircle);
library.add(faCheckCircle);
library.add(faCheck);
Vue.component('font-awesome-icon', FontAwesomeIcon);

//VueNoty
import VueNoty from 'vuejs-noty';
Vue.use(VueNoty, {
    timeout: 3000,
    progressBar: true,
    layout: 'topRight',
    theme: 'metroui'
});

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
}).$mount('#app');
