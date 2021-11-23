import { useQuery } from "react-query";
import { Student } from "models";
import studentApi from "apis/service/student";

export const useStudents = (nameStudent: any) => {
  console.log('nameStudent', nameStudent);
  
  // const fetchTodos = async () => {
  //   return await studentApi.getStudents(nameStudent)
  // }
  return useQuery<Student[], Error>(
    ['todo', nameStudent], 
    async () => {
      return await studentApi.getStudents(nameStudent)
    }, {
    keepPreviousData: true,
    enabled:true || Boolean(nameStudent)
    }
  );
}

export const useCities = (fetchApi: any) => {
  const fetchTodos = () => fetchApi()
  return useQuery<Student[], Error>(
    "useCities", 
    fetchTodos, {
    keepPreviousData: true,
    }
  );
}