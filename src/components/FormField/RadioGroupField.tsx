import * as React from 'react';
import { Control } from 'react-hook-form'
import { useController } from 'react-hook-form'

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disable?: boolean;
  options: RadioOption[];
}

export function RadioGroupField ({name, control, label, disable, options}: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error},
  } = useController({
    name,
    control,
  })
  
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="mt-2">
        {
          options.map(option => (
            <div>
              <label htmlFor={option.label} key={option.value} className="inline-flex items-center">
                <input checked={option.label == value ? true : false} type="radio" onChange={onChange} onBlur={onBlur} className="form-radio" name={option.label} value={option.value} />
                <span className="ml-2">{option.label}</span>
              </label>
            </div>
          ))
        }
      </div>
    </div>
  );
}
