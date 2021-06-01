<template>
  <div>
    <v-container>
    <card-top>
      <card-btn color="lime accent-4" icon="mdi-arrow-left" text="Powrót" @click.native="back" />
      <card-btn color="blue accent-4" icon="mdi-content-save-outline" text="Zapisz" @click.native="save" />
    </card-top>
    
    <v-card elevation="5">

        <v-card-title class="grey lighten-1"> Pomiary zbiornika</v-card-title>
        <v-divider></v-divider>
    <v-form v-model="arkusz">
      <v-container>
        <v-row justify="center" v-for="pomiar in dane" :key="pomiar.id">
        
          <v-col cols="12" md="4">
            <v-text-field
              v-model="pomiar.woda"
              :rules="nameRules"
              :counter="10"
              :label="`Pomiar ${pomiar.id}`"
              required
            ></v-text-field>
          </v-col>

          <v-col  cols="12" md="4">
            <v-text-field
              v-model="pomiar.cisnienie"
              :rules="nameRules"
              :counter="10"
              label="Cisnienie"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
        <card-botton />
  </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardBotton from '~/components/CardBotton.vue'
import CardBtn from '~/components/CardBtn.vue'
import CardTop from '~/components/CardTop.vue'
import { getters } from '~/store/badania'

export default {
  components: { CardTop, CardBtn, CardBotton },
    data() {
        return {
            arkusz: {},
            as: ''
        }
    },
  methods: {
    back() {
      this.$router.go(-1)
    },
    save(){
        this.$store.commit('badania/setMaxWoda',this.dane)
        this.$store.commit('badania/setMaxCisnienie',this.dane)
        this.$msg.showMessage({
          content: 'Zapisano dane !',
          color: 'grey',
        })   
        this.$router.go(-1)
    }
  },
  computed: {
    ...mapState({
      dane: (state) => {
        return state.badania.badanie.data
      },
      zb: (state) => {
          return state.badania.badanie.zbiornik.zbiornik.numer
      }
    }),
    zbiornik: {
        get() {
          return this.$store.state.badania.badanie.zbiornik.zbiornik.numer
        },
        set(newValue){
          this.as = newValue
        }
        

      }
    },
    mounted(){
      this.as=this.zbiornik 
    }
  
}
</script>

<style lang="sass" scoped>
</style>