import clsx from 'clsx';
import React, { ChangeEvent, useEffect, useState, useContext } from 'react';
import { IDeleteStudent } from './Table';
interface IPropsStudent extends IDeleteStudent {
  student: any;
  handleEditStudent: any;
  isCheckAll: boolean;
}

export const StudentItems: React.FC<IPropsStudent> = ({
  student,
  handleEditStudent,
  isCheckAll,
  listStudentIdDelete,
  setListStudentIdDelete,
}) => {
  // const { form } = useContext(HomeContext);
  const [isCheck, setCheck] = useState(false);
  function handleCheck(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    if (checked) {
      const newListStudentIdsDeleted = [...listStudentIdDelete, student.id];
      setListStudentIdDelete(newListStudentIdsDeleted);
    } else {
      const newListStudentIdsDeleted = listStudentIdDelete.filter(
        (idStudent: any) => idStudent !== student.id
      );
      setListStudentIdDelete(newListStudentIdsDeleted);
    }
    setCheck((pre) => !pre);
  }

  useEffect(() => {
    setCheck(isCheckAll);
  }, [isCheckAll]);

  const checkActive = clsx(
    'py-1 px-3 rounded-full text-xs',
    student.active ? 'bg-green-200 text-green-600 ml-2' : 'bg-red-200 text-red-600'
  );
  return (
    <tr className="tr" key={student.id}>
      <td className="pl-2 pr-2 td">
        {/* <Checkbox name="" value={checked} handleChangeChecked={handleCheckbox} /> */}
        <input
          type="checkbox"
          className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
          checked={isCheck}
          onChange={handleCheck}
        />
      </td>
      <td className="td">{student.name}</td>
      <td className="td">{student.description}</td>
      <td className="td">
        {student.status ? (
          <span className="btn-blue px-3 py-1 inline-flex text-xs leading-5 rounded-full text-white">
            Active
          </span>
        ) : (
          'inactive'
        )}
      </td>
      <td className="td">{student.city}</td>
      <td className="td">
        <button
          onClick={() => {
            handleEditStudent(student);
          }}
          className="btn btn-blue mr-2"
        >
          Edit
        </button>
        {/* <button onClick={() => {handleOpenModal(Student)}} className="ml-2 btn btn-primary">
            Delete
          </button> */}
      </td>
    </tr>
  );
};
