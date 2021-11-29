import React from 'react';

interface Props {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="my-4 flex flex-col items-end ">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium"> {currentPage * postsPerPage - 10} </span>
          to
          <span className="font-medium"> {currentPage * postsPerPage} </span>
          of
          <span className="font-medium"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block mt-2">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            {pageNumbers.map((number, index) => (
              <a
                onClick={() => {
                  paginate(number);
                }}
                href="#"
                className={
                  currentPage === number
                    ? 'bg-blue border-blue-300 text-blue-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                }
                key={index}
              >
                {number}
              </a>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
