import studentApi from 'apis/service/student';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteStudents = () => {
  const queryClient = useQueryClient();
  return useMutation((student) => studentApi.deleteById(student), {
    // When mutate is called:
    onMutate: async (studentsDelete: number[]) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('todo');

      // Snapshot the previous value
      const previousStudents = queryClient.getQueryData<any[]>('todo');

      //   // Optimistically update to the new value
      if (previousStudents) {
        queryClient.setQueryData<any[]>('todo', () => {
          return previousStudents.filter((student) => !studentsDelete.includes(student.id));
        });
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
