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
import * as yup from "yup";
import { useCities } from 'hooks/useStudents';
import { TextAreaField } from 'components/FormField/TextAreaField';

const schema = yup.object({
  name: yup.string().required('name is require'),
  age: yup.string().required('age is require'),
  // mark: yup.number().required(),
}).required();
export interface StudentFormProps {
  inititalValues?: Student;
  onSubmit?: (formValues: Student) => void;
  isAdd: boolean;
}

export default function StudentForm ({ isAdd, inititalValues, onSubmit }: StudentFormProps) {
  const history = useHistory();
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: inititalValues,
    resolver: yupResolver(schema)
  })
  const { mutate: update } = useUpdateStudents()
  const { mutate: create } = useAddStudents();

  const handleFormSubmit = async (formValues: any) => {
    if(isAdd) {
      await create(formValues);
    } else {
      await update(formValues)
    }
    await history.push('/')
  }
  
  const onHandleBack = () => {
    history.push('/')
  }
  const { data: dataFetchAll, refetch: fetchAll, isLoading: isFetchCity }= useCities(cityApi.getAll);

  useEffect(() => {
    fetchAll();
  }, [isFetchCity])
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-wrap">
          <InputField name="name" control={control} label="Full name"/>
          <InputField name="age" control={control} label="Age"/>
          <TextAreaField  name="mark" control={control} label="Mark"/>
          <Switch name="status" control={control} label="Status" /> 
          <SelectOption name="city" control={control} label="City" items={dataFetchAll}/>
          <div className="flex w-full mt-8 justify-end">
            <button type="submit" className="btn btn-blue mr-4">{isAdd ? 'Create' : 'Update'}</button>
            <button onClick={onHandleBack} className="btn btn-default">Cancel</button>
        </div>
        </div>
      </form>
    </div>
  );
}

