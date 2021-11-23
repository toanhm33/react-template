import Modal from "components/Common/Modal";
import { Checkbox } from "components/FormField/Checkbox";
import { useDeleteStudents } from "hooks/useDeleteStudents";
import { Student } from "models"
import React, { ChangeEvent, useState } from "react";
import { StudentItems } from "./StudentItems";

export interface IDeleteStudent {
  listStudentIdDelete: number[];
  setListStudentIdDelete: React.Dispatch<React.SetStateAction<number[]>>;
}

interface Props extends IDeleteStudent {
    listStudent: any;
    handleEditStudent: any;
    isLoading: boolean;
}

const Table: React.FC<Props> = ({listStudent,  listStudentIdDelete,
  isLoading,
  setListStudentIdDelete, handleEditStudent}) => {
  const [openModal, setOpenModal] = useState<any>();
  const [checked, setChecked] = useState<boolean>(false);
  const [student, setStudent] = useState<any>();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const handleCheckbox = () => {
    setChecked(!checked)
  }
  const { mutate: remove } = useDeleteStudents()
  const handleDelete = async (e: any) => {
    await remove(student.id)
    handleClose();
  }
  
  const handleClose = () => {
    setOpenModal(false);
  }
  const handleOpenModal = (student: Student) => {
    setOpenModal(true);
    setStudent(student)
  }
  function handleCheckAll(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    if (checked) {
      const listStudentIds = listStudent.map((student: any) => student.id);
      setListStudentIdDelete(listStudentIds);
    } else {
      setListStudentIdDelete([]);
    }
    setIsCheckAll((pre) => !pre);
  }
  return (
    <div className="flex flex-col">
      { isLoading ? 
        <div
          className="spinner"
        ></div> : ''
      }
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="sm:rounded-lg ">
            <table className="shadow-md min-w-full divide-y divide-gray-20">
              <thead className="shadow-lg bg-gray-200 py-4">
                <tr>
                  <th scope="col"
                    className="">
                    <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox focus:outline-none focus:shadow-outline cursor-pointer"
                        onChange={handleCheckAll}
                      />
                    </label>
                    </th>
                  <th
                    scope="col"
                    className="thead"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="thead"
                  >
                    Discription
                  </th>
                  <th
                    scope="col"
                    className="thead"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="thead"
                  >
                    City
                  </th>
                  <th scope="col" className="thead">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-20">
                {listStudent.map((student: any) => (
                  <StudentItems
                    key={student.id}
                    student={student}
                    handleEditStudent={handleEditStudent}
                    isCheckAll={isCheckAll}
                    setListStudentIdDelete={setListStudentIdDelete}
                    listStudentIdDelete={listStudentIdDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal 
        action="Delete" 
        title="Delete Student" 
        description="Do you really want to delete your account? This process cannot be undone" 
        handleAccept={handleDelete}    
        handleClose={handleClose}
        open={openModal}
        setOpen={setOpenModal}                     
      />
    </div>
  )}
export default Table