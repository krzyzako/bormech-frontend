<template>
  <div>
    <v-card elevation="2" outlined shaped>
      <v-card-title>Dodaj nową homolgacje : </v-card-title>
      <v-divider class="mx-4" inset></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="homolog"
              :counter="10"
              :rules="homologRules"
              label="Numer homologacji"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Symbol zbiornika"
              required
            ></v-text-field>

            <v-select
              v-model="select"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="Rodzaj zbiornika"
              required
            ></v-select>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="$router.go(-1)"> Anuluj </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homolog: '',
      homologRules: [
        (v) => !!v || 'Numer jest obowiązkowy',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
    }
  },
}
</script>

<style>
</style>