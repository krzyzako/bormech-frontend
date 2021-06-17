<template >
  <div>
    <div v-if="mqtt_connect">
      <card-top class="ma-7">
        <v-card-title class="flex justify-center text-center white--text">
          Dane ze stacji na żywo
        </v-card-title>
      </card-top>
      <VueApexCharts
        height="250"
        type="area"
        :options="options"
        :series="series"
        ref="chart"
      ></VueApexCharts>
      <v-btn @click.native="clikBtn"> </v-btn>
    </div>
    <div v-else>buuuuuu</div>
  </div>
</template>

<script>
import CardTop from '~/components/CardTop.vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: { CardTop, VueApexCharts },
  data() {
    return {
      mqtt_connect: Boolean,
      menu: false,
      data:[0,2,],
      options: {
        colors: ['#000000', '#91Eeff', '#9C27B0'],
        chart: {
          id: 'vuechart-example',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'ss',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    }
  },
  methods: {
    clikBtn() {
      this.menu = !this.menu
      console.log(this.menu)
      let test = this.menu
      var data = this.data.push(Math.floor(Math.random() * 100))
      console.log(data)
      // this.$refs.chart.updateOptions({chart: { toolbar: {show:test},zoom : {enabled:test}}})
      this.$refs.chart.updateOptions({
        series: [
          {
            data: [
              {
                x: '02-02-2002',
                y: 44,
              },
              {
                x: '12-02-2002',
                y: 51,
              },
            ],
          },
        ],
      })
    },
  },
  // watch: {
  // menu : function(val) {
  //   this.options = {
  //     ...this.options,
  //     ...{
  //       xaxis: {
  //         categories: [50, 21, 55, 55],
  //       },
  //     },
  //   }
  // this.$refs.chart.updateOptions({chart: { toolbar: {show:this.test},zoom : {enabled:this.test}}})
  // },
  // },
  beforeMount() {
    this.$mqtt.subscribe('iot-2/panel/')
  },
  mqtt: {
    'iot-2/panel/#'(data, topic) {
      let msg = JSON.parse(data.toString())
      this.mqtt_connect = msg.d.connected
      console.log('iot-2/panel/', msg)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>