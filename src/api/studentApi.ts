import { City, ListParams, Student, ListResponse } from 'models';
import axiosClient from "./axiosClient";

const studentApi2 = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/students';
    return axiosClient.get(url, {
      params
    });
  },
  
  getById(id: string): Promise<Student> {
    const url = `students/${id}`;
    return axiosClient.post(url);
  },

  add(data: any): Promise<Student> {
    const url = `/students`;
    return axiosClient.post(url, data);
  },

  update(data: any): Promise<Student> {
    const url = `/students/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  }
}

const findAll = async (params: ListParams) => {
  const response = await axiosClient.get<Student[]>("/students", {params});
  return response.data;
}


const studentApi = {
  findAll,
}
export default studentApi