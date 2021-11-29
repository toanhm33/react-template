import { ReactElement } from 'react';
import { Control, useController } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  items: any;
  control: Control<any>;
  onChange?: any;
}

export default function SelectOption({
  name,
  onChange,
  label,
  control,
  items,
}: Props): ReactElement {
  const {
    field: { value, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="flex w-48 md:items-center mb-6">
        <select value={value} onChange={onChange} className="shadow-md border-0	w-48 input lg:w-full block">
          {Boolean(items)
            ? items.map((item: any, index: number) => (
                <option value={item.value} key={index}>
                  {item.name}
                </option>
              ))
            : ''}
        </select>
    </div>
  );
}
