import cityApi from 'apis/service/cityApi';
import Switch from 'components/FormField/Switch';
import { InputField } from 'components/FormField';
import SelectOption from 'components/FormField/SelectOption';
import { useAddStudents } from 'hooks/useAddStudent';
import { useUpdateStudents } from 'hooks/useUpdateStudent';
import { Student } from 'models';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCities } from 'hooks/useStudents';
import { TextAreaField } from 'components/FormField/TextAreaField';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    name: yup.string().required('Name is require'),
    // age: yup.string().required('age is require'),
    // mark: yup.number().required(),
  })
  .required();
export interface StudentFormProps {
  inititalValues?: Student;
  onSubmit?: (formValues: Student) => void;
  isAdd: boolean;
}

export default function StudentForm({ isAdd, inititalValues, onSubmit }: StudentFormProps) {
  const history = useHistory();
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: inititalValues,
    resolver: yupResolver(schema),
  });
  const { mutate: update, isLoading: isLoadingEdit } = useUpdateStudents();
  const { mutate: create, isLoading: isLoadingCreate } = useAddStudents();

  const handleFormSubmit = async (formValues: any) => {
    if (isAdd) {
      await create(formValues);
      await toast.success('create success');
    } else {
      await update(formValues);
      await toast.success('update success');
    }
    setTimeout(() => {
      history.push('/');
    }, 800);
  };

  const onHandleBack = () => {
    history.push('/');
  };
  const {
    data: dataFetchAll,
    refetch: fetchAll,
    isLoading: isFetchCity,
  } = useCities(cityApi.getAll);

  useEffect(() => {
    fetchAll();
  }, [isFetchCity]);
  return (
    <div>
      {isLoadingCreate || isLoadingEdit ? <div className="spinner"></div> : ''}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-wrap">
          <InputField name="name" data-testid="name" control={control} label="Full name" />
          <Switch name="status" control={control} label="Status" />
          <TextAreaField name="description" control={control} label="Description" />
          <SelectOption name="city" control={control} label="City" items={dataFetchAll} />
          <div className="flex w-full mt-8 justify-end">
            <button type="submit" className="btn btn-blue mr-4">
              {isAdd ? 'Create' : 'Update'}
            </button>
            <button onClick={onHandleBack} className="btn btn-default">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
