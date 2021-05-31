<template>
  <div>
    <v-card elevation="2" outlined shaped>
      <v-card-title
        >Edycja : {{ $store.state.homolog.homolog.approval }}  {{select.tank_display}} </v-card-title
      >
      <v-divider class="mx-4" inset></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-row align="center">
            <v-col cols="6">
              <v-subheader> Rodzaj zbiornika</v-subheader>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="select"
                :hint="`${select.tank_display}, ${select.tank}`"
                :items="items"
                item-text="state"
                item-value="abbr"
                label="Select"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red lighten-2" text @click="$router.go(-1)">
          Anuluj
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'showCar',
  async fetch({ store, params }) {
    await store.dispatch('homolog/show', { homolog_id: params.id })
  },
  data () {
      return {
        items: [
          { state: 'Walcowy', abbr: 4 },
          { state: 'Teroidalny wewnętrzny', abbr: 1 },
          { state: 'Teroidalny zewnętrzny', abbr: 2 },
          { state: 'Teroidalny zewnętrzny pełny	', abbr: 3 },
        ],
      }
    },
    computed :{
        ...mapState({
            select: (state) => {
                return state.homolog.type
            },
        }),
    },
}
</script>

<style scoped>
</style>