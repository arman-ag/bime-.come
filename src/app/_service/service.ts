import axios, { AxiosResponse } from 'axios';
import { detailType } from './type';
const base_url = process.env.base_url;
const getAddress = async (): Promise<AxiosResponse<detailType[]>> => {
  const res = await axios.get(`${base_url}/my-addresses/`);
  return res;
};
export { getAddress };
