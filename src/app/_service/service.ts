import axios, { AxiosResponse } from 'axios';
import { detailType, personalInfoType } from './type';
const base_url = process.env.base_url;
const getAddress = async (): Promise<AxiosResponse<detailType[]>> => {
  const res = await axios.get(`${base_url}/my-addresses/`);
  return res;
};
const saveOrderRequest = async (
  data: personalInfoType
): Promise<AxiosResponse> => {
  const res = await axios.post(`${base_url}/order/completion/`, data);
  return res;
};

export { getAddress, saveOrderRequest };
