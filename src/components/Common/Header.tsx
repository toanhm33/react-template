import * as React from 'react';

export function Header () {
  
  return (
    <nav className="fixed z-50 bg-white p-7 w-full shadow-md">
      <div className="-mb-px flex justify-center">
          <a className="no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8" href="#">
              Home
          </a>
          <a className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8" href="#">
              Products
          </a>
          <a className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8" href="#">
              Discounts
          </a>
          <a className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3" href="#">
              Customers
          </a>
      </div>
    </nav>
  );
}
