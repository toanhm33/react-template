import { useMutation, useQueryClient } from "react-query";
import studentApi from "apis/service/student";

// export const useAddStudents = () => {
    // import { useMutation, useQueryClient } from 'react-query';
    // import { postBook } from 'src/apis/service/book';
    export const useAddStudents = () => {
      const queryClient = useQueryClient();
      return useMutation(studentApi.create, {
        // When mutate is called:
        onMutate: async (newBook) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries('todo');
    
          // Snapshot the previous value
          const previousBooks = queryClient.getQueryData<any[]>('todo');
    
          //   // Optimistically update to the new value
          if (previousBooks) {
            queryClient.setQueryData<any[]>('todo', () => [
              ...previousBooks,
              newBook,
            ]);
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
    