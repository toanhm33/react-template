import { ReactElement } from 'react'
import { Control, useController } from 'react-hook-form'

interface Props {
  name: string;
  label: string;
  items: any;
  control: Control<any>;
  onChange?: any;
}

export default function SelectOption({name, onChange, label, control, items}: Props): ReactElement {
  const {
    field: { value, onBlur, ref },
    fieldState: { invalid, error},
  } = useController({
    name,
    control,
  })
  
  return (
    <div className="md:flex lg:w-3/6 md:w-full md:items-center mb-6">
        <div className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">{label}</div>
        <div className="md:w-2/3">
          <select value={value} onChange={onChange} className="input w-full form-select block">
            {
              Boolean(items) ? items.map((item: any, index: number) => (
                <option value={item.value} key={index}>{item.name}</option>
              )) : ''
            }
          </select>
        </div>
    </div>
  )
}
