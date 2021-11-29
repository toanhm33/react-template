import { useMutation, useQueryClient } from 'react-query';
import studentApi from 'apis/service/student';

// export const useAddStudents = () => {
// import { useMutation, useQueryClient } from 'react-query';
// import { postStudent } from 'src/apis/service/Student';
export const useAddStudents = () => {
  const queryClient = useQueryClient();
  return useMutation(studentApi.create, {
    // When mutate is called:
    onMutate: async (newStudent) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('todo');

      // Snapshot the previous value
      const previousStudents = queryClient.getQueryData<any[]>('todo');

      //   // Optimistically update to the new value
      if (previousStudents) {
        queryClient.setQueryData<any[]>('todo', () => [...previousStudents, newStudent]);
      }

      return { previousStudents };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context: any) => {
      if (context?.previousStudents) {
        queryClient.setQueryData<any>('todo', context.previousStudents);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('todo');
    },
  });
};
