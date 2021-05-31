import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
        list : [],
        homolog : {},
        type : {
            tank_display :"",
            tank :""
        }
  });

export const mutations = {
    set(state, homolog){
        state.list = homolog
    },
    mergeHomolog(state, form) {
        assign(state.homolog, form)
    },
    tankType(state, form){
        state.type.tank_display = form.tank_display
        state.type.tank = form.tank

    }
}

export const actions = {
    async get({commit}) {
        await this.$axios.get(`/api/homolog/`)
          .then((res) => {
            if (res.status === 200) {
              commit('set', res.data)
            }
          })
    },
    async show({commit}, params) {
        await this.$axios.get(`/api/homolog/${params.homolog_id}`)
          .then((res) => {
            if (res.status === 200) {
              commit('mergeHomolog', res.data)
              commit('tankType', res.data)
            }
          })
      },
    
}