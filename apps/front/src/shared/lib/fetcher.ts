import axios from 'axios';

export async function getFetcher() {
  return axios.create({});
}
