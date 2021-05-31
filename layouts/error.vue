<template>
  <v-app dark>
    <v-card elevation="5">
      <v-card-title >
            <h1 class="justify-text-center" v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
      </v-card-title>
      <v-card-subtitle>
         <NuxtLink to="/"> Strona główna </NuxtLink>
      </v-card-subtitle>
    </v-card>

  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Strona o podanym adresie nie istnieje ',
      otherError: 'Wystąpił błąd',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
