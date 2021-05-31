<template>
  <div>
    <v-card elevation="2">
      <v-card-title class="mt-5"> Raport badania zbiornika </v-card-title>
    </v-card>
    <v-row class="mt-10">
      <v-col>
        <client-only>
          <VueApexCharts
            width="500"
            type="line"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </v-col>
      <v-col>
          <badanie-chart title="siema" :series="wykre"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import BadanieChart from '~/components/badania/BadanieChart.js'

export default {
  async fetch(){
      this.$store.dispatch(`badania/getChart`, this.$route.params.id)
  },

  components: { BadanieChart },
  data: function () {
    return {

      chartOptions: {
        title: {
          text: 'Ciśnienie w funkcji czasu',
          align: 'left',
        },
        chart: {
          id: 'vuechart-example',
          locales: [
            {
              name: 'pl',
              options: {
                months: [
                  'Styczeń',
                  'Luty',
                  'Marzec',
                  'Kwiecień',
                  'Maj',
                  'Czerwiec',
                  'Lipiec',
                  'Sierpień',
                  'Wrzesień',
                  'Październik',
                  'Listopad',
                  'Grudzień',
                ],
                shortMonths: [
                  'Sty',
                  'Lut',
                  'Mar',
                  'Kwi',
                  'Maj',
                  'Cze',
                  'Lip',
                  'Sie',
                  'Wrz',
                  'Paź',
                  'Lis',
                  'Gru',
                ],
                days: [
                  'Niedziela',
                  'Poniedziałek',
                  'Wtorek',
                  'Środa',
                  'Czwartek',
                  'Piątek',
                  'Sobota',
                ],
                shortDays: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
                toolbar: {
                  exportToSVG: 'Pobierz SVG',
                  exportToPNG: 'Pobierz PNG',
                  exportToCSV: 'Pobierz CSV',
                  menu: 'Menu',
                  selection: 'Wybieranie',
                  selectionZoom: 'Zoom: Wybieranie',
                  zoomIn: 'Zoom: Przybliż',
                  zoomOut: 'Zoom: Oddal',
                  pan: 'Przesuwanie',
                  reset: 'Resetuj',
                },
              },
            },
          ],
          defaultLocale: 'pl',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 32, 35, 50, 49, 60, 70, 91],
        },
      ],
      wykre: [
        {
          name: 'el1',
          data : this.w.data
        },
      ],
    }
  },
}
</script>