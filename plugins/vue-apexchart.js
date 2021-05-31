import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
VueApexCharts.chart = {
    locales: [{
        "name": "pl",
        "options": {
          "months": [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień"
          ],
          "shortMonths": [
            "Sty",
            "Lut",
            "Mar",
            "Kwi",
            "Maj",
            "Cze",
            "Lip",
            "Sie",
            "Wrz",
            "Paź",
            "Lis",
            "Gru"
          ],
          "days": [
            "Niedziela",
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota"
          ],
          "shortDays": ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
          "toolbar": {
            "exportToSVG": "Pobierz SVG",
            "exportToPNG": "Pobierz PNG",
            "exportToCSV": "Pobierz CSV",
            "menu": "Menu",
            "selection": "Wybieranie",
            "selectionZoom": "Zoom: Wybieranie",
            "zoomIn": "Zoom: Przybliż",
            "zoomOut": "Zoom: Oddal",
            "pan": "Przesuwanie",
            "reset": "Resetuj"
          }
        }
      }
      ],
    defaultLocale: "pl"
}
Vue.use(VueApexCharts)
Vue.component('VueApexCharts', VueApexCharts);

