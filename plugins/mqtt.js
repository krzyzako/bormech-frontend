import Vue from 'vue'
import VueMqtt from 'vue-mqtt';
Vue.use(VueMqtt, 'ws://10.8.0.4:9001' , {username: 'hmi', password:'bormech4321'});