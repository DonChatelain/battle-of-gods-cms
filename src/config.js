const url = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:6660/'

export default { 
  API_URL: url + 'api'
}