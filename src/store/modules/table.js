import * as tableApi from "@/api/tables";

export const namespaced = true

export const state = {
    tables: []
}

export const mutations = {
    ADD_TABLE(state, table) {
        state.tables.unshift(table)
    },
    SET_TABLES(state, tables) {
        state.tables = tables
    },
    UPDATE_TABLE(state, newTable) {
        const table = state.tables.find(oldTable => oldTable.id === newTable.id)
        table.name = newTable.name
        table.seatsNumber = newTable.seatsNumber
        table.isActive = newTable.isActive
        table.isOccupied = newTable.isOccupied
    },
    DELETE_TABLE(state, id) {
        const index = state.tables.findIndex(table => table.id === id)
        state.tables.splice(index, 1)
    }
}

export const actions = {
    createTable({commit}, table) {
        return tableApi.postTable(table)
            .then(response => {
                commit('ADD_TABLE', response.data)
            })
    },
    fetchTables({commit}) {
        return tableApi.getTables()
            .then(response => {
                commit('SET_TABLES', response.data)
            })
    },
    fetchTable({commit}, tableId) {
      return tableApi.getTable(tableId)
          .then(response => {
              commit('ADD_TABLE', response.data)
          })
    },
    updateTable({commit}, updatedTable) {
        return tableApi.updateTable(updatedTable.id, updatedTable)
            .then(response => {
                commit('UPDATE_TABLE', response.data)
            })
    },
    deleteTable({commit}, tableId) {
        return tableApi.deleteTable(tableId)
            .then(response => {
                if (response.data === true) {
                    commit('DELETE_TABLE', tableId)
                }
            })
    }
}
