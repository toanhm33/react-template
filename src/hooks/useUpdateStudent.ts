import { useMutation, useQueryClient } from "react-query";
import studentApi from "apis/studentApi";

export const useUpdateStudents = () => {
  const queryClient = useQueryClient()
  return useMutation(student => studentApi.update(student), {
      onMutate: async (student: any) => {
          await queryClient.cancelQueries('todo'); //cancel any in-flight or pending query to the `todos` key
          await queryClient.cancelQueries(['todo', student])

          const prev = queryClient.getQueryData(['todo', student.id]) // retrieve the cached data 
          
          queryClient.setQueryData(['todo', student.id], student) //add the new todo to the data
          // also update the whole list to enable smooth navigation
          queryClient.setQueryData('todo', (old: any = []) => {
              
              const index = old?.findIndex((item: any) => item.id === student.id)
              return [...old?.slice(0, index), student, ...old?.slice(index + 1, old.length)]
          })

          // return the previous list and the newTodo to be used later inside the context
          return {
              prev, student
          }
      },
      onError: (err, _, context: any) => {
          queryClient.setQueryData(['todos', context.todo.id], context.prev) //rollback the cache to the previous state
      },
      onSettled: todo => {
          queryClient.invalidateQueries('todos') //refetch the collection on the background
          queryClient.invalidateQueries(['todos', todo.id]) //refetch the collection on the background
      }

  })
}