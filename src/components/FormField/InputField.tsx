import * as React from 'react';
import { Control } from 'react-hook-form'
import { useController } from 'react-hook-form'

export interface InputFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField ({name, control, label}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error},
  } = useController({
    name,
    control,
  })
  console.log(name);
  return (
    <div className="md:flex lg:w-3/6 md:w-full md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input 
          value={name}
          onChange={onChange}
          className="input w-full" 
          id="inline-full-name" 
          type="text"/>
      </div>
    </div>
  );
}
