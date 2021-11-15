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
    console.log(data);
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

const findByName = async (title: string) => {
  const response = await axiosClient.get<Student[]>(`/students?name_like=${title}`);
  return response.data;
}

const filter = async (filter: string) => {
  const response = await axiosClient.get<Student[]>(`/students?name_like=${filter}`);
  return response.data;
}

const create = async ({  name, age, city, gender, mark }: Student) => {
  const response = await axiosClient.post<any>("/students", {  name, age, city, gender, mark });
  return response.data;
}

const update = async (id: any, { name, age, city, gender, mark}: Student) => {
  const response = await axiosClient.put<any>(`/students/${id}`, {  name, age, city, gender, mark });
  return response.data;
}

const deleteById = async (id: any) => {
  const response = await axiosClient.delete<any>(`/students/${id}`);
  return response.data;
}

const getById = async (id: any) => {
  const response = await axiosClient.get<any>(`/students/${id}`);
  return response.data;
}

const studentApi = {
  findAll, findByName, filter, create, update, deleteById, getById
}
export default studentApi