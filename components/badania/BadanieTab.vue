<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tabs"
      :items-per-page="5"
      item-key="name"
      class="elevation-10"
      hide-default-footer
    >
    <template v-slot:top>
      
        <v-toolbar-title class="text-center">Pomiary :</v-toolbar-title>
      
    </template>
    </v-data-table>
  </div>
</template>

<script>
 export default {
     props: {
         tabs: {
             type: Array,
             default: []
         },
     },
    data () {
      return {
        headers: [
          {
            text: 'Czas',
            align: 'start',
            value: 'czas',
          },
          { text: 'Cisnienie [Pa]', value: 'cisnienie' },
          { text: 'Przyrost [l]', value: 'woda'},
        ],
        
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>