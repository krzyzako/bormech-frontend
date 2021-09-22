import Vue from 'vue'
import VueMqtt from 'vue-mqtt';
export default function ({$axios}) {
    if (process.client) {
        Vue.use(VueMqtt, 'ws://'+window.location.hostname+':9001' , {username: 'hmi', password:'bormech4321'});
    }
}