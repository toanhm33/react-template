import { useMutation, useQueryClient } from "react-query";
import studentApi from "apis/studentApi";

export const useAddStudents = () => {
  const queryClient = useQueryClient()
    return useMutation(student => studentApi.create(student), {
      onMutate: async (newStudent: any) => {
          await queryClient.cancelQueries('todo'); //cancel any in-flight or pending query to the `todos` key

          const prev = queryClient.getQueryData('todo') // retrieve the cached data 

          queryClient.setQueryData('todo', (old: any) => [{ ...newStudent, id: Date.now() }, ...old]) //add the new todo to the data

          // return the previous list and the newTodo to be used later inside the context
          return {
              prev, newStudent
          }
      },
      onError: (err, _, context: any) => {
          queryClient.setQueryData('todo', context.prev) //rollback the cache to the previous state
      },
      onSettled: () => {
          queryClient.invalidateQueries('todo') //refetch the collection on the background
      }
  })
}