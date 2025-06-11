import axios from 'axios';

const client = axios.create({
  // baseURL: process.env.REACT_APP_URI
  // Local
  // baseURL: "http://localhost:8081"
  // dev - GCP: 
  baseURL: "https://pinellas-dev-wckqd7o3eq-uw.a.run.app/"
});

export default client;