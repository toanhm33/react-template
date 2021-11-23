import studentApi from "apis/studentApi";
import { useMutation, useQueryClient } from "react-query";

const useDeleteStudents = () => {
  const queryClient = useQueryClient()
  return useMutation((todoId: any) => studentApi.deleteById(todoId), {
      onMutate: async todo => {
          await queryClient.cancelQueries('todo'); //cancel any in-flight or pending query to the `todos` key

          const prev: any = queryClient.getQueryData('todo') // retrieve the cached data 
          queryClient.setQueryData('todo', () => {
            // old.filter((item: any) => item.id !== todo.id)
            return prev.filter((student: any) => !todo.includes(student.id));
          })//remove the todo from the previous list

          // return the previous list and the todo
          return {
              prev
          }
      },
      onError: (err, _, context: any) => {
          queryClient.setQueryData('todos', context.prev)
      },
      onSettled: todo => {
          queryClient.invalidateQueries('todos') //refetch the collection on the background
      }

  })
}

export default useDeleteStudents