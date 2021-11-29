import { useMutation, useQueryClient } from 'react-query';
import studentApi from 'apis/service/student';

// export const useUpdateStudents = () => {
// import { useMutation, useQueryClient } from 'react-query';
// import { updatestudent } from 'src/apis/service/student';

export const useUpdateStudents = () => {
  const queryClient = useQueryClient();
  return useMutation((student) => studentApi.update(student), {
    // When mutate is called:
    onMutate: async (studentUpdate: any) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('todo');

      // Snapshot the previous value
      const previousStudents = queryClient.getQueryData<any[]>('todo');

      //   // Optimistically update to the new value
      if (previousStudents) {
        queryClient.setQueryData<any[]>('todo', () => {
          const previousStudentsCopy = [...previousStudents];
          const foundStudent = previousStudentsCopy.findIndex((student) => student.id === studentUpdate.id);
          if (foundStudent) {
            previousStudentsCopy[foundStudent] = studentUpdate;
          }
          return previousStudentsCopy;
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
