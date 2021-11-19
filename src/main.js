import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './api'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

api.init("http://127.0.0.1:8000");

createApp(App).use(store).use(router).use(VueAxios, axios).use(VueSweetalert2).mount('#app')
