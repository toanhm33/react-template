import Table from 'views/HomePage/components/Table';
import { Student } from 'models';
import { ChangeEvent, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import { useStudents } from 'hooks/useStudents';
import { HomeContextProvider } from 'views/HomePage/HomeContext';
import { useDeleteStudents } from 'hooks/useDeleteStudents';
import { toast } from 'react-toastify';
import { InputSearch } from 'components/FormField/InputSearch';
import SelectOption from 'components/FormField/SelectOption';
import { useForm } from 'react-hook-form';

export interface HomePageProps {
}

export function HomePage (props: HomePageProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const history = useHistory();
  const { data: dataFetchAll, isLoading, error }= useStudents(debouncedSearch);
  const [listStudentIdDelete, setListStudentIdDelete] = useState<number[]>([]);
  const { mutateAsync: mutateDeleteStudent, isLoading: loadingDeleteStudent } = useDeleteStudents();
  const isDeleteBook = useMemo(() => {
    return !Boolean(listStudentIdDelete.length);
  }, [listStudentIdDelete]);
  const { control, handleSubmit, register } = useForm<Student>({
    defaultValues: {}
  })
  console.log('control', register);
  
  const handleAddStudent = () => {
    history.push('/student/add');
  }
  const handleEditStudent = (student: Student) => {    
    history.push(`/student/${student.id}`);
  }
  const labels = [
    {id: 0, name: 'active', label: 'active', value: true},
    {id: 1, name: 'inactive', label: 'inactive', value: false}
  ]
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
  
    const { value } = event.target;
    setSearch((pre: any) => ({ ...pre, name: value }));
  }

  function handleChangeStatus(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSearch((pre: any) => ({ ...pre, active: value }));
  }
  
  async function handleDeleteStudent() {
    try {
      await mutateDeleteStudent(listStudentIdDelete);
      toast.success('Delete success');
      setListStudentIdDelete([]);
    } catch (error) {}
  }
  function handleSelectStatus(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSearch((pre: any) => ({ ...pre, status: value }));
  }
  if (error) {
    return <div>Something wrong.</div>;
  }
  return (
    <HomeContextProvider>
      <div className="mt-12 flex-col lg:flex-row flex justify-between	">
        <div className="relative w-48 lg:w-auto inline-block text-gray-600">
          <InputSearch
            placeholder="Search book..."
            onChange={handleSearchChange}
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <SelectOption name="status" control={control} onChange={handleSelectStatus} label="Status" items={labels}/>
        <div>
          <button onClick={handleDeleteStudent} disabled={isDeleteBook} className="btn mr-4 btn-primary ">Delete</button>
          <button onClick={handleAddStudent} className="btn btn-blue ">Add new student</button>
        </div>
      </div>
      <Table 
      handleEditStudent={handleEditStudent}
      listStudent={dataFetchAll ?? []}
      listStudentIdDelete={listStudentIdDelete}
      setListStudentIdDelete={setListStudentIdDelete}
      isLoading={isLoading || loadingDeleteStudent}
      />
    </HomeContextProvider>
  );
}

export default HomePage