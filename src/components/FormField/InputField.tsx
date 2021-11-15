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
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input 
          value={value}
          onChange={onChange}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          id="inline-full-name" 
          type="text"/>
      </div>
    </div>
  );
}
