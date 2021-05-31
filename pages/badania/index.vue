<template>
  <div class="page-wrapper">
    <v-row>
    <badania-list v-for="b in badanie" :key="b.id" :badanie="b"/>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import BadaniaList from '@/components/badania/BadaniaList'

export default {
  components: {
    BadaniaList,
  },
  async fetch({ store }) {
    await store.dispatch('badania/get')
  },
  computed: {
    ...mapState({
      badanie: (state) => {
        return state.badania.list
      },
      ilosc: (state) => {
        return state.badania.list.length/2
      }
    }),
    // ilosc: function()  {
    //   return this.$store.badania
    // }
  },
}
</script>