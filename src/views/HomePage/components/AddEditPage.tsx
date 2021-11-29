import studentApi from 'apis/service/student';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import StudentForm from 'views/component/StudentForm';

export interface AddEditPageProps {}

function AddEditPage(props: AddEditPageProps) {
  const { student_id } = useParams<{ student_id: string }>();
  const [student, setStudent] = useState<Student>();
  const isEdit = Boolean(student_id);
  const isAdd = Boolean(student_id === 'add');

  useEffect(() => {
    if (!student_id) return;
    (async () => {
      try {
        const data: Student = await studentApi.getById(student_id);
        setStudent(data);
      } catch (error) {
        console.log('fail to fetch user', error);
      }
    })();
  }, [student_id]);

  const inititalValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: '',
    city: '',
    ...student,
  } as Student;

  return (
    <div className="flex justify-center">
      <div className="card">
        <h1 className="text-gray-500 font-bold text-xl mt-4 mb-8">
          {isAdd ? 'Add new studentent' : 'Update student'}
        </h1>
        {(!isEdit || Boolean(student) || isAdd) && (
          <StudentForm inititalValues={inititalValues} isAdd={isAdd} />
        )}
      </div>
    </div>
  );
}

export default AddEditPage;
