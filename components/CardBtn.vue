<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          rounded
          v-on="on"
          v-bind="attrs"
          elevation="10"
          :color="color"
          class="ma-6"
          :to="to"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ text }}</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
    props: {
        color: {
            type: String 
        },
        icon: {
            type: String 
        },
        text: {
            type: String 
        },
        to: {
          type : String
        }
    },
}
</script>
