import studentApi from 'api/studentApi';
import { Student } from 'models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import StudentForm from 'views/component/StudentForm';

export  interface AddEditPageProps {
}

function AddEditPage (props: AddEditPageProps) {
  const { student_id } = useParams<{ student_id: string }>();
  const [student, setStudent] = useState<Student>();
  const history = useHistory();
  const params = useParams();
  
  const isAdd = Boolean(student_id === 'add');
  console.log('student_id', isAdd);

  useEffect(() => {
    if(!student_id) return;
    (async () => {
      try {
        const data: Student = await studentApi.getById(student_id);
        console.log(data);
        
      } catch (error) {}})();
  },[student_id]);

  const inititalValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: '',
    city: '',
    ...student,
  } as Student;
  
  const handleStudentFormSubmit = (formValues: Student) => {};
  const onHandleBack = () => {
    history.push('/')
  }
  return (
    <div className="flex justify-center">
      <div className="card">
        <h1 className="text-gray-500 font-bold text-xl mt-4 mb-8">{isAdd ? 'Add new studentent' : 'Update student'}</h1>
        <StudentForm inititalValues={inititalValues} onSubmit={handleStudentFormSubmit} />
        <div className="flex mt-8 justify-end">
          <button className="btn btn-blue mr-4">{isAdd ? 'Create' : 'Update'}</button>
          <button onClick={onHandleBack} className="btn btn-blue">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddEditPage