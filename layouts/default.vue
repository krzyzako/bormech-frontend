<template>
<div id="app">
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      expand-on-hover
      color="grey darken-2"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
         <v-list-item
          v-if="mqtt_connect"
          router
          exact
          to="/live"
        >
          <v-list-item-action>
            <v-icon class="white--text">mdi-connection</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text" >Live</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar clipped-left fixed  color="grey darken-1" app>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer />
     
     <v-card v-if="mqtt_connect" outlined elevation="2" color="green darken-4" class="pa-2 flex headline">
       <v-card-title v-show="1" class="justify-center grey--text ">Stacja włączona</v-card-title>
     </v-card>
      <v-spacer />
      <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" value="favorites" @click="userLogout">
      <v-icon color="red">mdi-logout</v-icon>
      </v-btn>
      </template>
      <span>Wyloguj {{$auth.user}}</span>
      </v-tooltip>
      
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer absolute app padless fixed>
      <span>&copy; {{ new Date().getFullYear() }} Bormech sp. z o.o. {{mqtt_connect}}</span>
    </v-footer>
    <snackbar></snackbar>
  </v-app>
</div>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue'

export default {
  components: {
    
    Snackbar,
  },
  middleware: 'auth',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      mini : true,
      mqtt_connect : false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Homologacje',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Badania',
          to: '/badania',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Admin-Bormech',
    }
  },
  methods : {
    async userLogout() {
      try {
        const response = await  this.$auth.logout()
        console.log(response)
        this.$router.push({ name: 'login' })
      } catch (err) {
        console.log(err)
      }
    
    },
    msg_mqtt() {
        this.$msg.showMessage({content: 'Stacja niedostepna !',color: 'grey',})   
    },
    handler: function handler(event) {
        this.$msg.showMessage({content: 'Stacja dostepna !',color: 'red',})  
    }
  },
  watch: {
    mqtt_connect: function(val) {
      if (this.mqtt_connect) {
        this.$msg.showMessage({content: 'Stacja dostepna !',color: 'red',})  

      }else{
        this.$msg.showMessage({content: 'Stacja niedostepna !',color: 'grey',})  
      }
    }
  },
  mounted () {
    this.$mqtt.subscribe('#')
  },
  mqtt: {
    'iot-2/panel/#' (data, topic) {
      let msg = JSON.parse(data.toString())
      this.mqtt_connect = msg.d.connected
      console.log('iot-2/panel/', msg)
    },
  },
}
</script>
