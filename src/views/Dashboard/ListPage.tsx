import Table from 'components/Common/Table';
import * as React from 'react';
import { useQuery } from 'react-query';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import Pagination from 'components/Common/Pagination';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import useDebounce from 'hook/useDebounce';

export interface ListPageProps {
}

export function ListPage (props: ListPageProps) {
  const [getResult, setGetResult] = useState<string | any>(null);
  const [getPageNumber, setGetPageNumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [postsPerPage] = useState(10);
  const match = useRouteMatch();
  const history = useHistory();

  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingTutorials, refetch: getAllTutorials } = useQuery<Student[], Error>(
    "query-tutorials",
    async () => {
      return await studentApi.findAll({
        _page: getPageNumber,
        _limit: 10,
      });
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setGetResult(res);
      },
      onError: (err: any) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  const { isLoading: isSearchingTutorial, refetch: findTutorialsByName } = useQuery<Student[], Error>(
    "query-tutorials-by-title", // ["query-tutorials-by-title", search],
    async () => {
      return await studentApi.findByName(search);
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        setGetResult(res);
      },
      onError: (err: any) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );
  const debounceParam = {value: isSearchingTutorial, delay: 500}
  const debouncedSearch = useDebounce(debounceParam);

  useEffect(() => {
    getAllData();
  }, [isLoadingTutorials, getPageNumber]);
  
  function getAllData() {
    try {
      getAllTutorials();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }

  useEffect(() => {
    // if (isSearchingTutorial) setGetResult("searching...");
    searchByName();
  }, [search]);

  function searchByName() {
    if (search) {
      try {
        findTutorialsByName();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  const handleAddStudent = () => {
    history.push('/student/add');
  }

  const handleEditStudent = (student: Student) => {    
    history.push(`/student/${student.id}`);
  }

  const paginate = (pageNumber: number) => {
    setGetPageNumber(pageNumber);
  }

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  }
  
  // const { data, isFetching, isLoading, error, isError } = useQuery('key_unique', getPosts)
  return (
    <div>
      {isLoadingTutorials ? 
        <div
          className="spinner"
        ></div> : ''
      }
      <div className="mt-12 mb-4 flex justify-between	">
        <div className="relative inline-block text-gray-600">
          <input 
            type="search" 
            value={search}
            onChange={handleSearchChange}
            name="search" placeholder="Search..." className="bg-purple-white shadow-md rounded border-0 p-3 rounded-sm bg-white h-10 px-5 pr-10 text-sm focus:outline-none"/>
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <button onClick={handleAddStudent} className="btn shadow-md btn-blue ">Add new student</button>
      </div>
      <Table 
      onEdit={handleEditStudent}
      listStudent={getResult} />
      <Pagination       
      totalPosts={getResult !== null ? getResult?.pagination?._totalRows : 0}
      postsPerPage={postsPerPage}
      paginate={paginate}
      currentPage={getPageNumber}
      />
    </div>
  );
}

export default ListPage