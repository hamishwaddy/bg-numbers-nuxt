import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://orriebetes.herokuapp.com/api/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getLatestEntry () {
    return apiClient.get('/entries.json', { params: { count: 1 } })
  },
  getEntriesLastHour () {
    return apiClient.get('/entries.json', { params: { count: 12 } })
  },
  getEntriesLastThreeHours () {
    return apiClient.get('/entries.json', { params: { count: 36 } })
  },
  getEntriesLastSixHours () {
    return apiClient.get('/entries.json', { params: { count: 72 } })
  },
  getEntriesLastTwelveHours () {
    return apiClient.get('/entries.json', { params: { count: 144 } })
  },
  getEntriesLastTwentyFourHours () {
    return apiClient.get('/entries.json', { params: { count: 288 } })
  }
}
