<template>
  <div id="wrapp">
    <v-container>
      <card-top>
        <card-btn color="lime accent-4" icon="mdi-arrow-left" text="Powrót" @click.native="$router.go(-1)" />
        <card-btn color="white" icon="mdi-printer" text="Drukuj" @click.native="print" />
        <card-btn color="white" icon="mdi-book-edit" text="Edytuj" to="/badania/edit" />
        <card-btn color="red" icon="mdi-delete" text="Usuń"  />
      </card-top>
  
      <v-card elevation="5" shaped>
        
        <v-card-title class="mt-5 grey darken-2">
          <v-row>
            <v-col class="white--text">
              Raport badania
              {{ zbiornik.zbiornik.homolog.symbol }}
              {{ zbiornik.zbiornik.zbiornik.numer }}
            </v-col>
            <v-col  :class="{ 'red--text': hasError }">
              <span v-if="(zbPozytywny==='NEGATYWNY')" >Wynik badania : {{ zbPozytywny }}</span> 
            </v-col>
            <v-col>
                <v-select
                dark
                color="deep-orange"
                v-model="pek"
                :items="pekniecie"
                label="Charakter pęknięcia"
              ></v-select>
            </v-col>
          </v-row>     
        </v-card-title>
        <v-card-subtitle class="white--text grey darken-2">
          Badanie {{ zbiornik.zbiornik.zbiornik.nr_odbioru }}/{{zbiornik.zbiornik.zbiornik.nr_rozrywania}}</v-card-subtitle>

         
        <v-card-text class="grey lighten-1 ma-0 pb-0 justify-center flex text-center font-weight-bold">
          <v-row>
            <v-col>
              Badanie dokonano dnia: {{ zbiornik.zbiornik.zbiornik.dataBadania }}
            </v-col>
            <v-col >
              Maksymalny przyrost : {{ zbiornik.maxwoda }} litrów co stanowi
              {{ zbProcent }}% zbiornika
            </v-col>
            <v-col>
              Maksymalne ciśnienie : {{ zbiornik.maxCisnienie }} MPa co stanowi x{{zbCisnienie}}cisnienia próbnego
            </v-col>
        </v-row>
        </v-card-text>
       
        <karta />
        <v-container fluid>
          <v-row justify="center" class="md2 my-10">
            <BadanieTab :tabs="zb.data" />
          </v-row>
        </v-container>
        <card-botton />
      </v-card>
    </v-container>
    <client-only>
      <section id="print">
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="false"
          :preview-modal="true"
          filename="hehehe"
          :paginate-elements-by-height="1400"
          :pdf-quality="2"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="700px"
          :html-to-pdf-options="htmlToPdfOptions"
          :manual-pagination="true"
          @progress="onProgress($event)"
          @hasDownloaded="hasDownloaded($event)"
          ref="html2Pdf"
        >
          <print-content
            slot="pdf-content"
            :test="test"
            :pek="pek"
            :pozytywny="zbPozytywny"
          ></print-content>
        </vue-html2pdf>
      </section>
    </client-only>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BadanieChart from '~/components/badania/BadanieChart.js'
import BadanieTab from '~/components/badania/BadanieTab.vue'
import CardBtn from '~/components/CardBtn.vue'
import CardTop from '~/components/CardTop.vue'
import PrintContent from '~/components/PrintContent.vue'

import { state } from '~/store/badania'
export default {
  components: { PrintContent, BadanieChart, BadanieTab, CardBtn, CardTop },
  // async asyncData() {
  //  await this.$store.dispatch(`badania/getChart`, this.$route.params.badanie)
  //  await this.$store.dispatch(`badania/show`, this.$route.params.badanie)
  // },
  // beforeMount() {
  //   this.$store.dispatch(`badania/getChart`, this.$route.params.badanie)
  //   this.$store.dispatch(`badania/show`, this.$route.params.badanie)
  // },
  data() {
    return {
      hasError: false,
      pekniecie: ['plastyczny', 'kruche'],
      pek: 'plastyczny',
      test: '',
      htmlToPdfOptions: {
        margin: [10, 10],
        filename: `hehehe.pdf`,
        html2canvas: {
          dpi: 600,
          scale: 3,
          useCORS: true,
        },

        jsPDF: {
          precision: 2,
          format: 'a4',
          orientation: 'p',
        },
      },
    }
  },
  computed: {
    ...mapState({
      woda: (state) => {
        return state.badania.woda
      },
      czas: (state) => {
        return state.badania.czas
      },
      cisnienie: (state) => {
        return state.badania.cisnienie
      },

      zbiornik: (state) => {
        return state.badania.badanie
      },
    }),
    czasToSec() {},
    cis: function () {
      return this.cisnienie[0].data
    },
    maxWoda: function () {
      return Math.max.apply(Math, this.woda[0].data)
    },
    maxCsnienie: function () {
      // zmiana na MPa
      return this.zbiornik.cisnienie / 10
    },
    zb: function () {
      return this.$store.state.badania.badanie
    },
    zbProcent: function () {
      const licz =
        (this.zbiornik.maxwoda * 100) / this.zbiornik.zbiornik.homolog.capacity
      return `${licz.toFixed(1)}`
    },
    zbCisnienie: function () {
      const licz = this.zbiornik.maxCisnienie / 3
      return licz.toFixed(1)
    },

    zbPozytywny: function () {
      if (
        this.zbiornik.zbiornik.homolog.tank === 1 ||
        this.zbiornik.zbiornik.homolog.tank === 3
      ) {
        if (this.zbCisnienie > 2.25 && this.zbProcent > 8) {
          return 'POZYTYWNY'
        } else {
          this.hasError = true
          return 'NEGATYWNY'
        }
      }
    },
  },
  methods: {
    print() {
      console.log('sss')
      this.$refs.html2Pdf.generatePdf()
    },
    dataBadania() {
      console.log(this.zbiornik.zbiornik.zbiornik.dataBadania)
    },
    onProgress(event) {
      console.log(event)
    },
    hasDownloaded(blobPdf) {
      console.log(`PDF has downloaded yehey`)
      this.pdfDownloaded = true
      console.log(blobPdf)
    },
    hasStartedGeneration() {
      console.log('start')
    },
    hasGenerated(event) {
      console.log('gen', event)
    },
    editBadanie() {
      this.$router.push({ name: 'badania-edit' })
    },
  },
  mounted () {
    if (!this.zbiornik.zbiornik.homolog){
      this.$router.push('badanie/')
    };
  
   this.test = location.origin

  },
}
</script>

<style>
</style>