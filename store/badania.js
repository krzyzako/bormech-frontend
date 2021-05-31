import merge from "lodash.merge";
import assign from 'lodash.assign';
import { result } from "lodash";

export const state = () => ({
        list : [],
        badanie : {},
        woda :[],
        cisnienie : [],
        czas:[],

  });

export const mutations = {
    set(state, badanie){
        state.list = badanie
    },
    mergeBadanie(state, form) {
        assign(state.badanie, form)
    },
    setWoda(state, woda){
      woda = {'data': woda, name: 'Woda'}
      state.woda[0]=woda
      window.dispatchEvent(new Event("resize"));
    },
    setCzas(state, czas){
      state.czas=czas
    },
    setCisnienie(state, cisnienie){
      cisnienie = {'data': cisnienie, name: 'Ciśnienie'}
      state.cisnienie[0]=cisnienie
    },
    setMaxWoda(state, woda){
      var ss = []
      for(var i in woda)
        ss.push(woda[i].woda);
      state.badanie.woda = ss
      state.badanie.maxwoda = Math.max(...ss)
    },
    setMaxCisnienie(state, cis){
      var ss = []
      for(var i in cis)
        ss.push(cis[i].cisnienie);
      state.badanie.cisnienie = ss
      console.log(Math.max(...ss)/10)
      state.badanie.maxCisnienie = (Math.max(...ss)) /10
    }
}
 
export const getters = {
  getWoda: state => {
    return state.woda;
  },
  getNazwa: state => {
    return state.badanie
  } 
}

export const actions = {
    async get({commit}) {
        await this.$axios.get(`/api/tanks/`)
          .then((res) => {
            if (res.status === 200) {
              commit('set', res.data)
            }
          })
    },
    async show({commit}, param) {
        await this.$axios.get(`/api/tanks/badanie/${param}`)
          .then((res) => {
            if (res.status === 200) {
              commit('mergeBadanie', res.data)
              commit('setMaxWoda', res.data.data)
              commit('setMaxCisnienie', res.data.data)
            }
          })
    },
    async getChart({commit}, param){
      await this.$axios.get(`/api/tanks/badanie/chart/${param}`)
        .then((res) => {
          if (res.status === 200) {
            commit('setWoda', res.data.woda)
            commit('setCzas', res.data.czas)
            commit('setCisnienie', res.data.cisnienie)
          }
        } )
    }, 
    delete({commit}, params) {
        return this.$axios.delete(`/api/tanks/badanie/delete/${params.id}`)
      }
    
}