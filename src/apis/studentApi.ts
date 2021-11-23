import { Student } from 'models';
import axiosClient from "./axiosClient";

const findAll = async () => {
  const response = await axiosClient.get<Student[]>("/students");  
  return response.data;
}

const findByName = async (title: string) => {
  const response = await axiosClient.get<Student[]>(`/students?${title}`);
  return response.data;
}

const filter = async (filter: string) => {
  const response = await axiosClient.get<Student[]>(`/students?name_like=${filter}`);
  return response.data;
}

const create = async (data: any) => {
  const response = await axiosClient.post<any>("/students", data);
  return response.data;
}

const update = async (student: any) => {
  const response = await axiosClient.put<any>(`/students/${student.id}`, student);
  return response.data;
}

const deleteById = async (data: number[]) => {
  const itemsDelete = data.map((id) =>
    axiosClient.delete(`/students/${id}`)
  );
  return await Promise.all(itemsDelete);
}

const getById = async (id: any) => {
  const response = await axiosClient.get<any>(`/students/${id}`);
  return response.data;
}

const studentApi = {
  findAll, findByName, filter, create, update, deleteById, getById
}
export default studentApi