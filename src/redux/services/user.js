import client from '../apiClient'; 

export const getData = (body) => {
    return client.post('/api/search', body)
}
export const getNetSales = (body) => {
    // return client.post('/api/search', {body: encodeToBase64(body)})
    return client.post('/api/search', body)
  }
  export const getNotes = (body) => {
    // return client.post('/api/notes', {body: encodeToBase64(body)})
    return client.post('/api/notes', body)
  }