import studentApi from 'api/studentApi';
import { Student } from 'models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import StudentForm from 'views/component/StudentForm';

export  interface AddEditPageProps {
}

function AddEditPage (props: AddEditPageProps) {
  const { student_id } = useParams<{ student_id: string }>();
  const [student, setStudent] = useState<Student>();
  const params = useParams();

  const isEdit = Boolean(student_id);

  useEffect(() => {
    if(!student_id) return;
    
    (async () => {
      try {
        const data: Student = await studentApi.getById(student_id);
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

  return (
      <div>
        <h1>{isEdit ? 'Update student' : 'Add new studentent'}</h1>
        <div>
          <StudentForm inititalValues={inititalValues} onSubmit={handleStudentFormSubmit} />
        </div>
      </div>
  );
}

export default AddEditPage