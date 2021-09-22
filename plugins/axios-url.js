export default function ({$axios}) {
    if (process.client) {
      $axios.defaults.baseURL = 'http://'+window.location.hostname+':8000'
    }
  }