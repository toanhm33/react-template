import { useMutation, useQueryClient } from "react-query";
import studentApi from "apis/service/student";

// export const useUpdateStudents = () => {
// import { useMutation, useQueryClient } from 'react-query';
// import { updateBook } from 'src/apis/service/book';

    export const useUpdateStudents = () => {
      const queryClient = useQueryClient();
      return useMutation((book) => studentApi.update(book), {
        // When mutate is called:
        onMutate: async (bookUpdate: any) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries('todo');
    
          // Snapshot the previous value
          const previousBooks = queryClient.getQueryData<any[]>('todo');
    
          //   // Optimistically update to the new value
          if (previousBooks) {
            queryClient.setQueryData<any[]>('todo', () => {
              const previousBooksCopy = [...previousBooks];
              const foundBook = previousBooksCopy.findIndex(
                (book) => book.id === bookUpdate.id
              );
              if (foundBook) {
                previousBooksCopy[foundBook] = bookUpdate;
              }
              return previousBooksCopy;
            });
          }
    
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
    