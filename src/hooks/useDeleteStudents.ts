import studentApi from "apis/service/student";
import { useMutation, useQueryClient } from "react-query";

    export const useDeleteStudents = () => {
      const queryClient = useQueryClient();
      return useMutation((book) => studentApi.deleteById(book), {
        // When mutate is called:
        onMutate: async (booksDelete: number[]) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries('todo');
    
          // Snapshot the previous value
          const previousBooks = queryClient.getQueryData<any[]>('todo');
    
          //   // Optimistically update to the new value
          if (previousBooks) {
            queryClient.setQueryData<any[]>('todo', () => {
              return previousBooks.filter((book) => !booksDelete.includes(book.id));
            });
          }
          console.log(previousBooks, 'bookUpdate');
          return { previousBooks };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, variables, context: any) => {
          if (context?.previousBooks) {
            queryClient.setQueryData<any>('todo', context.previousBooks);
          }
        },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries('todo');
        },
      });
    };
    