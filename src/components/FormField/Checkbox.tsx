export interface CheckboxProps {
  name: string;
  value: boolean;
  handleChangeChecked: any;
}

export function Checkbox({ name, value, handleChangeChecked }: CheckboxProps) {
  return (
    <div className="block">
      <div className="mt-2">
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox cursor-pointer"
              defaultChecked={value}
              onChange={handleChangeChecked}
            />
            <span className="ml-2">{name}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
