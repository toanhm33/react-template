import axiosClient from "../axiosClient";

const getAll = async () => {
  const response = await axiosClient.get<any>(`/cities`);
  return response.data;
}

const cityApi = {
  getAll
}
export default cityApi
