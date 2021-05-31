<template>
  <section slot="pdf-content">
    <section>
      <p style="text-align: right; font-size: 10px; padding-top: 0">
        Wydruk dnia {{ currentDate() }}
      </p>
      <p style="text-align: center; font-size: 16px">
        <STRONG>
         
          Protokół nr: OT5/{{ dane.zbiornik.nr_odbioru }}/{{
            dane.zbiornik.nr_rozrywania
          }}/BOR/R3</STRONG
        >
      </p>
      <p style="text-align: center; font-size: 16px">
        z próby zbiornika LPG na rozerwanie
      </p>
      <table style="padding-top: 10px">
        <tr>
          <td style="border: 1px" width="300px">
            <p>
              <span>1. <u> Wytwórca zbiornika:</u></span>
            </p>
          </td>

          <td>
            <p>
              <strong
                >P.P.H. &rdquo;Bormech&rdquo; Sp. z o.o. Zakład Nr 2<br />
                ul. Grunwaldzka 10; 76-200 Słupsk</strong
              >
            </p>
          </td>
          <td width="20px"></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="border: 1px" width="300px">
            <p width="600px">
              2. <u>Nr fabryczny</u> <strong>{{ snNumer() }}</strong>
            </p>
          </td>

          <td>
            <p>
              <u>Data produkcji: </u> <strong>{{ dataProdukcji() }}</strong>
            </p>
          </td>
          <td width="240px"></td>
        </tr>
      </table>
      <table id="upp">
        <tr>
          <td style="border: 1px" width="300px">
            <p class="alignleft">
              <span>3. <u>Klasa zbiornika</u></span
              ><span>: </span><span><strong>1</strong></span
              ><span></span>
            </p>
          </td>

          <td align="left">
            <p>
              <span><u>Pojemność zbiornika:</u></span>
              <span
                ><strong>{{ dane.homolog.capacity }} l</strong></span
              >
            </p>
          </td>
          <td></td>
        </tr>
      </table>
      <table>
        <tr>
          <td width="250px">
            <p>
              <span>4. <u>Miejsce i data badania</u></span
              ><span>: </span><span></span>
            </p>
          </td>

          <td>
            <p>
              <strong
                >P.P.H. &rdquo;Bormech&rdquo; Sp. z o.o. Zakład Nr 2<br />w
                Słupsk dnia {{ dane.zbiornik.dataBadania }}</strong
              >
            </p>
          </td>
          <td width="20px"></td>
        </tr>
      </table>
      <table>
        <tr>
          <td>
            <p>5. <u>Ciśnienie próbne :</u></p>
          </td>
          <td style="padding-left: 10px">
            <p><strong>3.0 MPa</strong></p>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <table>
        <tr>
          <td>
            <p>6. <u>Ciśn. rozrywające:</u></p>
          </td>
          <td style="padding-left: 10px" width="350px">
            <p>
              a)minimalne (2,25 ciśn. próbnego) <strong>6,75 MPa</strong>
              <br />b)rzeczywiste <strong> {{maxCsnienie}} MPa</strong>
            </p>
          </td>
          <td></td>
        </tr>
      </table>
      <table>
        <tr>
          <td>
            <p align="left">
              <span
                >7.
                <u
                  >Szkic umiejscowienia pęknięcia zbiornika po rozerwaniu</u
                ></span
              ><span>:</span>
            </p>
          </td>
        </tr>
      </table>

      <img
        style="
          padding-top: 20px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 50%;
        "
        width="600px"
        height="200px"
        src="~/assets/WEW.jpg"
      />
      <table border="0" style="padding-top: 20px">
        <tr style="vertical-align: top; text-align: left">
          <td width="250px">
            <span>8. <u>Opis charakteru pęknięcia:</u> <br /> </span>
          </td>
          <td>
            <p>
              <span v-if="pek === 'plastyczny'"
                >Brak oznak kruchego pękania. <br />
                Charakter pęknięcia – <strong>{{ pek }}</strong>
              </span>
              <span v-else
                >Oznaki kruchego pękania. <br />
                Charakter pęknięcia – <strong>{{ pek }}</strong></span
              >
            </p>
          </td>
        </tr>
      </table>
      <table border="0" style="padding-bottom: 10px">
        <tr>
          <td width="250px">
            <p>
              <span>9. <u>Ocena wyników badania: </u></span>
            </p>
          </td>
          <td>
            Wynik badania –
            <strong>
              {{ pozytywny }}
            </strong>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td>
            <p>
              <span
                >10. <u>Rejestracja przyrostu ciśnienia i objętości.</u></span
              >
            </p>
          </td>
        </tr>
      </table>
      <table
        border="1"
        style="
          margin-left: auto;
          margin-right: auto;
          border-collapse: collapse;
          padding-top: 20px;
        "
      >
        <tr>
          <th width="150px"><p>Ciśnienie [MPa]</p></th>
          <th width="200px"><p>Przyrost objętości [l]</p></th>
          <th width="150px"><p>Uwagi</p></th>
        </tr>

        <tr v-for="pomiar in wyniki" :key="pomiar.id">
          <td>
            <p align="center">
              <strong>{{ pomiar.cisnienie / 10 }}</strong>
            </p>
          </td>
          <td>
            <p align="center">
              <strong>{{ pomiar.woda }}</strong>
            </p>
          </td>
          <td><p align="center">-----------------</p></td>
        </tr>
      </table>
      <table>
        <tr>
          <td>
            <br />
            <p>
              <span
                >11.<u>
                  Przyrost objętości w momencie poprzedzającym rozerwanie
                </u></span
              >
            </p>
          </td>
        </tr>
        <tr>
          <td align="center">
            <p>
              <span
                >Przyrost <strong> {{zb.maxwoda}} litrów </strong>, co stanowi
                <strong>{{zbProcent}} %</strong> początkowej objętości
                zbiornika.</span
              >
            </p>
          </td>
        </tr>
      </table>
      <table style="padding-bottom: 200px">
        <tr>
          <td>12. <u>Uwagi, zalecenia:</u> ---</td>
        </tr>
      </table>
      <table>
        <tr>
          <td><hr /></td>
          <td style="width: 350px"></td>
          <td><hr /></td>
        </tr>

        <tr>
          <td style="vertical-align: middle; text-align: center">
            <p>Podpis KJ „Bormech”</p>
          </td>
          <td></td>
          <td><p>Podpis Inspektora TDT</p></td>
        </tr>
      </table>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { state } from '~/store/badania'
export default {
  props: {
    test: {
      type: String,
      default: '',
    },
    pek: {
      type: String,
      default: '',
    },
    pozytywny: {
      type: String,
      default: '',
    },
  },

  methods: {
    currentDate() {
      const current = new Date()
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`
      return date
    },
    dataProdukcji() {
      const rok = this.dane.zbiornik.dataBadania.split('-')
      const year = rok[0]
      return year
    },
    snNumer() {
      const sn = this.dane.homolog.symbol + ' ' + this.dane.zbiornik.numer
      return sn
    },
  },
  computed: {
    ...mapState({
      dane: (state) => {
        return state.badania.badanie.zbiornik
      },
      zb: (state) => {
        return  state.badania.badanie
      },
      wyniki: (state) => {
        return state.badania.badanie.data
      },
      woda: (state) => {
        return state.badania.woda
      },
      czas: (state) => {
        return state.badania.czas
      },
      cisnienie: (state) => {
        return state.badania.cisnienie
      },
      zbProcent: function () {
      const licz =
        (this.maxWoda * 100) / this.dane.homolog.capacity
      return licz.toFixed(1)
      },
      maxWoda: (state) => {
        return state.badania.badanie.maxwoda
      },
      maxCsnienie: (state) => {
        return state.badania.badanie.maxCisnienie
      }
    }),

  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$emit('domRendered')
      }, 1000)
    })
  },
}
</script>


<style lang="scss" scoped>
.pdf-content {
  width: 100%;
  padding-top: 0;
  background: #fff;
}
</style>