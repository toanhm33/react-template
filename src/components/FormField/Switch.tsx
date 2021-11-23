import { ReactElement, useState } from 'react'
import { Control, useController } from 'react-hook-form'

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
}

export default function Switch({name, control, label}: Props): ReactElement {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error},
  } = useController({
    name,
    control,
  })
  console.log(value);
  
  const [isChecked, setChecked] = useState(value ?? true);
  
  return (
    <div className="md:flex lg:w-3/6 md:w-full md:items-center mb-6">
      <div className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        {label}
      </div>
      <div
        className="
          relative
          inline-block
          w-10
          mr-2
          align-middle
          select-none
          transition
          duration-200
          ease-in
        "
      >
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          defaultChecked={isChecked}
          onChange={onChange}
          className="
            toggle-checkbox
            absolute
            block
            w-6
            h-6
            rounded-full
            bg-white
            border-4
            appearance-none
            cursor-pointer
          "
        />
        <label
          htmlFor="toggle"
          className="
            toggle-label
            block
            overflow-hidden
            h-6
            rounded-full
            bg-gray-300
            cursor-pointer
          "
        ></label>
      </div>
    </div>
  )
}
