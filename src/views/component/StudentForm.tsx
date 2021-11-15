import { InputField, RadioGroupField } from 'components/FormField';
import { Student } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export interface StudentFormProps {
  inititalValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm ({ inititalValues, onSubmit }: StudentFormProps) {
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: inititalValues 
  })

  const handleFormSubmit = (formValues: Student) => {
    console.log(formValues);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name"/>
        <InputField name="age" control={control} label="Age"/>
        <InputField name="mark" control={control} label="Mark"/>
        <InputField name="city" control={control} label="City"/>
        <RadioGroupField name='gender' control={control} label='gender' disable={false} 
          options={
            [
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]
          }
        />
        <div>
          <button className="btn btn-blue">Save</button>
        </div>
      </form>
    </div>
  );
}
