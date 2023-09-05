import * as unityApi from "@/api/units";

export const namespaced = true

export const state = {
    units: []
}

export const mutations = {
    ADD_UNIT(state, unit) {
        state.units.unshift(unit)
    },
    SET_UNITS(state, units) {
        state.units = units
    },
    UPDATE_UNIT(state, newUnit) {
        const unit = state.units.find(oldUnit => oldUnit.id === newUnit.id)
        unit.name = newUnit.name
    },
    DELETE_UNIT(state, id) {
        const index = state.units.findIndex(unit => unit.id === id)
        state.units.splice(index, 1)
    }
}

export const actions = {
    createUnit({commit}, unit) {
        return unityApi.postUnit(unit)
            .then(response => {
                commit('ADD_UNIT', response.data)
            })
    },
    fetchUnits({commit}) {
        return unityApi.getUnits()
            .then(response => {
                commit('SET_UNITS', response.data)
            })
    },
    updateUnit({commit}, updatedUnit) {
        return unityApi.updateUnit(updatedUnit.id, updatedUnit)
            .then(response => {
                commit('UPDATE_UNIT', response.data)
            })
    },
    deleteUnit({commit}, unitId) {
        return unityApi.deleteUnit(unitId)
            .then(response => {
                if (response.data === true) {
                    commit('DELETE_UNIT', unitId)
                }
            })
    }
}
