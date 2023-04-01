import { createApp } from 'vue'
import { router } from './router';
import App from './App.vue';
import 'bootstrap/dist/js/bootstrap.js';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCheck, faList, faCircleExclamation, faUser, faHotel, faPaperPlane, faBed } from '@fortawesome/free-solid-svg-icons'



/* add icons to the library */
library.add(faCheck, faList, faCircleExclamation, faUser, faHotel, faPaperPlane, faBed)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
