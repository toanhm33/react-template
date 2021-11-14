import Table from 'components/Common/Table';
import * as React from 'react';
import { useQuery } from 'react-query';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import Pagination from 'components/Common/Pagination';

export interface DashboardProps {
}

export function Dashboard (props: DashboardProps) {
  const [getResult, setGetResult] = useState<string | any>(null);
  const [getPageNumber, setGetPageNumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
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
        console.log('isLoadingTutorials2', isLoadingTutorials);
        setGetResult(res);
      },
      onError: (err: any) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    getAllData();
  }, [isLoadingTutorials, getPageNumber]);
  console.log('getResult', getResult);
  
  function getAllData() {
    try {
      getAllTutorials();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }
  console.log(getResult);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber: number) => {
    setGetPageNumber(pageNumber);
  }
  // const { data, isFetching, isLoading, error, isError } = useQuery('key_unique', getPosts)
  return (
    <div>
        {isLoadingTutorials ? 'show loading' : ''}
       
        <div className=" bg-gray-200">
            <div className="container flex justify-center items-center">
                <div className="relative">
                    <input type="text" className="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder="Search anything..."/>
                    <div className="absolute top-2 right-2"> <button className="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600">Search</button> </div>
                </div>
            </div>
        </div>

        <Table listStudent={getResult}/>
        <Pagination       
        totalPosts={getResult !== null ? getResult?.pagination?._totalRows : 0}
        postsPerPage={postsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        />
    </div>
  );
}

export default Dashboard