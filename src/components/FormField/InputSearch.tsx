import clsx from 'clsx';
import React, { InputHTMLAttributes } from 'react';

export const InputSearch: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const className = clsx(
    'inputSearchStyle',
    props.className && props.className
  );

  return (
    <div className="relative">
      <input 
      type="search" 
      {...props}
      name="search" placeholder="Search..." className="mb-4 lg:mb-0 bg-purple-white shadow-md rounded border-0 p-3 rounded-sm bg-white h-10 px-5 pr-10 text-sm focus:outline-none"/>
    </div>
  );
};
