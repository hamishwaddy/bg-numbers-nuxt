import EntryService from '@/services/EntryService.js'
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      latestEntry: {},
      entriesLastThreeHours: [],
      entriesLastSixHours: [],
      entriesLastTwelveHours: [],
      entriesLastTwentyFourHours: []
    },
    mutations: {
      SET_LOADING_STATUS (state) {
        state.isLoading = !state.isLoading
      },
      SET_LATEST_ENTRY (state, entry) {
        state.latestEntry = entry
      },
      SET_ENTRIES_LAST_THREE_HOURS (state, entries) {
        state.entriesLastThreeHours = entries
      },
      SET_ENTRIES_LAST_SIX_HOURS (state, entries) {
        state.entriesLastSixHours = entries
      },
      SET_ENTRIES_LAST_TWELVE_HOURS (state, entries) {
        state.entriesLastTwelveHours = entries
      },
      SET_ENTRIES_LAST_TWENTYFOUR_HOURS (state, entries) {
        state.entriesLastTwentyFourHours = entries
      }
    },
    actions: {
      nuxtServerInit ({ commit }, context) {
        return EntryService.getEntriesLastTwentyFourHours()
          .then((res) => {
            commit('SET_LATEST_ENTRY', res.data[0])
            commit('SET_ENTRIES_LAST_THREE_HOURS', res.data.slice(0, 36))
            commit('SET_ENTRIES_LAST_SIX_HOURS', res.data.slice(0, 72))
            commit('SET_ENTRIES_LAST_TWELVE_HOURS', res.data.slice(0, 144))
            commit('SET_ENTRIES_LAST_TWENTYFOUR_HOURS', res.data)
          })
          .catch(e => context.error(e))
      },
      async fetchLatestEntry ({ commit }) {
        commit('SET_LOADING_STATUS')
        const { data } = await EntryService.getLatestEntry()
        commit('SET_LATEST_ENTRY', data)
        commit('SET_LOADING_STATUS')
      },
      async fetchLastThreeHourBgData ({ commit }) {
        commit('SET_LOADING_STATUS')
        const { data } = await EntryService.getEntriesLastThreeHours()
        commit('SET_ENTRIES_LAST_THREE_HOURS', data)
        commit('SET_LOADING_STATUS')
      },
      async fetchLastSixHourBgData ({ commit }) {
        commit('SET_LOADING_STATUS')
        const { data } = await EntryService.getEntriesLastSixHours()
        commit('SET_ENTRIES_LAST_SIX_HOURS', data)
        commit('SET_LOADING_STATUS')
      },
      async fetchLastTwelveHourBgData ({ commit }) {
        commit('SET_LOADING_STATUS')
        const { data } = await EntryService.getEntriesLastTwelveHours()
        commit('SET_ENTRIES_LAST_TWELVE_HOURS', data)
        commit('SET_LOADING_STATUS')
      },
      async fetchLastTwentyFourHourBgData ({ commit }) {
        commit('SET_LOADING_STATUS')
        const { data } = await EntryService.getEntriesLastTwentyFourHours()
        commit('SET_ENTRIES_LAST_TWENTYFOUR_HOURS', data)
        commit('SET_LOADING_STATUS')
      }
    },
    getters: {
      latestEntry (state) {
        return state.latestEntry
      },
      lastThreeHours (state) {
        return state.entriesLastThreeHours
      },
      lastSixHours (state) {
        return state.entriesLastSixHours
      },
      lastTwelveHours (state) {
        return state.entriesLastTwelveHours
      },
      lastTwentyFourHours (state) {
        return state.entriesLastTwentyFourHours
      }
    }
  })
}

export default createStore
