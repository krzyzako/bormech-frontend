<template>
  <div class="login">
    <div id="bg">
      <img src="https://bormech.pl/wp-content/uploads/2020/07/IMG_7039-2-1024x683.jpg" alt />
    </div>

    <v-container fluid grid-list-lg>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card :loading="true" class="mx-auto mt-lg-16 mt-sm-3" max-width="550">
            <template slot="progress">
              <v-progress-linear color="grey" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img
              height="150"
              class="blue darken-4"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              src="https://bormech.pl/wp-content/uploads/2020/07/1-1-208x300.jpg"
            >
              <v-card-title class="white--text mt-15">
                <v-avatar color="error " size="60">
                  <v-icon class="white--text">mdi-lock</v-icon>
                </v-avatar>
                <p class="ml-3 mt-3">BorAdmin v 0.2</p>
              </v-card-title>
            </v-img>
            <v-form v-model="valid">
              <v-container class="grey lighten-3">
                <v-row class="ma-0" justify="center" no-gutters>
                  <v-col md="auto">
                    <v-text-field
                      required
                      v-model="login.username"
                      label="Login"
                      prepend-icon="mdi-account"
                      append-icon="mdi-account"
                      name="name"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="ma-0" justify="center" no-gutters>
                  <v-col md="auto">
                    <v-text-field
                      required
                      v-model="login.password"
                      :rules="passRules"
                      :type="value ? 'password' : 'text'"
                      prepend-icon="mdi-lock"
                      name="password"
                      label="Hasło"
                      :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="() => (value = !value)"
                      @keyup.enter="userLogin"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center" no-gutters class="ma-5">
                  <v-col md="auto">
                    <v-btn color="success lighten-1" :disabled="!valid" @click="userLogin">Zaloguj</v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="error" justify="center" no-gutters>
                  <v-alert dense outlined type="error">Podano błedne dane logowania !</v-alert>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import Snackbar from '~/components/Snackbar'

export default {
  components: {
    Snackbar,
  },
  layout: 'login',
  //   name: 'App',

  components: {},
  data: () => ({
    login: {
      username: '',
      password: '',
    },
    error: false,
    valid: false,
    diableName: true,
    value: true,
    nameRules: [(v) => (v && v.length >= 5) || 'Login musi zawierać 5 znaków'],
    disablePass: true,
    passRules: [(v) => v.length >= 6 || 'Hasło musi zawierać 5 znaków'],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        'E-mail must be valid',
    ],
  }),
  computed: {},
 
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })
        console.log(response)
      } catch (err) {
        console.log(err)
        this.$msg.showMessage({
          content: 'Podane dane do logowania są niepoprawne!',
          color: 'error',
        })
      }
    },

    btnDisable() {
      return this.disableName
    },
  },
}
</script>

<style scoped>
#bg {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
}
#bg img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  min-width: 50%;
  min-height: 50%;
}
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
</style>
