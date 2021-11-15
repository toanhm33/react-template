import React, { ReactElement } from 'react'

interface Props {
  
}

export default function SelectOption({}: Props): ReactElement {
  return (
    <div className="md:flex lg:w-3/6 md:w-full md:items-center mb-6">
        <div className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Select</div>
        <div className="md:w-2/3">
          <select className="input w-full form-select block">
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
    </div>
  )
}
