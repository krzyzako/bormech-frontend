<template>
<v-col sm="12" lg="6"  cols="12">
      <v-hover
        v-slot="{ hover }"
        open-delay="200"
      >
  <v-card class="grey mt-4" outlined  :elevation="hover ? 16 : 2" shaped>
  <v-card-title class="grey lighten-1">

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 font-weight-bold" >
          {{ tank.symbol }} nr. {{ badanie.numer }} {{badanie.zbiornik}}
        </v-list-item-title>
         <v-divider  />
        <v-row>
          <v-col >
            <v-list-item class="headline mt-0 mb-0  font-weight-bold">
              Badanie {{ badanie.nr_odbioru }}/{{ badanie.nr_rozrywania }}.
            </v-list-item>
            <v-list-item class="headline mt-0 mb-0  font-weight-thin">
              Data : {{ badanie.dataBadania }}
            </v-list-item>
          </v-col>
         
          <v-col>
            <v-list-item class="headline mt-0 mb-1  pa-0 font-weight-thin">
              <v-row>
              <v-col class="font-weight-bold" xl="6" cols="12">
              Homologacja: 
              </v-col>
              <v-col xl="6" cols="12">
              {{ tank.approval }}
              </v-col>
              </v-row>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card-title>
  
    <v-card-actions >
      <card-btn color="white" icon="mdi-eye" text="Podgląd" @click.native="openBadanie(badanie.id)" />
      <v-spacer></v-spacer>
      <card-btn color="white" icon="mdi-delete" text="Usuń" @click.native="dialog=true" />
    </v-card-actions>
  
    <v-dialog v-model="dialog" persistent max-width="700">
      <v-card>
        <v-card-title class="headline">
          Czy napewno chcesz usunąć badanie {{ badanie.nr_odbioru }} /
          {{ badanie.nr_rozrywania }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Anuluj
          </v-btn>
          <v-btn color="green darken-1" text @click="remove"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
      </v-hover>
</v-col>
</template>
<script>
import CardBtn from '../CardBtn.vue'
export default {
  data() {
    return {
 
     tank: {},
      dialog: false,
    }
  },
  async fetch() {
    this.tank = await this.$axios
      .get(`api/homolog/${this.badanie.rodzaj}`)
      .then((res) => res.data)
  },
  methods: {
    remove() {
      this.$store
        .dispatch('badania/delete', { id: this.badanie.id })
        .then(() => {
          this.$store.dispatch('badania/get')
          this.$msg.showMessage({ content: 'Ununięto badanie', color: 'error' })
          this.dialog = false
        })
    },
    async openBadanie(id){
      await this.$store.dispatch(`badania/getChart`, id)
      await this.$store.dispatch(`badania/show`, id)
      this.$router.push(`badania/raport/${id}`)
    }
  },
  props: {
    badanie: Object,
  },
}
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>