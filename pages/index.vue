<template>
  <v-card>
    <v-card-title max-width="600px">
      
    </v-card-title>
  <v-data-table
    :headers="headers"
    :items="homolog"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Homologacje</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Szukaj"
        single-line
        hide-details
        
      ></v-text-field>
        <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" to="/homolog/add" >
              Dodaj nową
            </v-btn>        
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
    
  </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('homolog/get')
  },

  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Homologacje',
        align: 'start',
        sortable: false,
        value: 'approval',
      },
      { text: 'Symbol', value: 'symbol' },
      { text: 'Typ', value: 'tank_display' },
      { text: 'Pojemność', value: 'capacity' },
      { text: 'Wysokość', value: 'height' },
      { text: 'Średnica', value: 'dimeter'},
      { text: 'Waga', value: 'weight'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nowa homologacja' : 'Edydcja'
    },
    ...mapState({
      homolog: (state) => {
        return state.homolog.list
      },
    }),
  },
  watch: {
    dialog(val) {
      console.log(this.homolog)
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.desserts = await this.$axios.get('/api/homolog/').data
      console.log(this.desserts)
    },
    editItem(item) {
      this.$router.push({path: `homolog/edit/${item.id}`})
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
