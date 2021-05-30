import EntryService from '@/services/EntryService.js'

export const state = () => ({
  latestEntry: [],
  entriesLastHour: []
})

export const mutations = {
  SET_LATEST_ENTRY (state, entry) {
    state.latestEntry = entry
  },
  SET_ENTRIES_LAST_HOUR (state, entries) {
    state.entriesLastHour = entries
  }
}

export const actions = {
  fetchLatestEntry ({ commit }) {
    return EntryService.getLatestEntry().then((response) => {
      commit('SET_LATEST_ENTRY', response.data)
    })
  },
  fetchLatestEntriesLastHour ({ commit }) {
    return EntryService.getEntriesLastHour().then((response) => {
      commit('SET_ENTRIES_LAST_HOUR', response.data)
    })
  }
}
