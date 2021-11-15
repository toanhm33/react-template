import { Student } from "models"
import React, { useState } from "react";
import Modal from "./Modal";
import Pagination from "./Pagination";

interface Props {
    listStudent: any;
    onEdit: any;
}

const Table: React.FC<Props> = ({listStudent, onEdit}) => {

    const handleDelete = () => {
    }
    const handleClose = () => {
    }
    const handleOpen = () => {
    }
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow sm:rounded-lg ">
              <table className="min-w-full divide-y divide-gray-20">
                <thead className="shadow-lg bg-gray-100">
                  <tr>
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
                      Role
                    </th>
                    <th scope="col" className="thead">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-20">
                  { listStudent !== null ? listStudent.data?.map((student: Student) => (
                    <tr key={student.id}>
                      <td className="td">
                        {student.name}
                      </td>
                      <td className="td">
                        {student.gender}
                      </td>
                      <td className="td">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="td">
                        vv
                      </td>
                      <td className="td">
                        <button 
                          onClick={() => {
                            onEdit(student)
                          }}
                          className="btn text-indigo-600 mr-4 hover:text-indigo-900 font-semibold">
                          Edit
                        </button> 
                        <a href="#" className="text-red-600 hover:text-indigo-900 font-semibold">
                          Delete
                        </a>
                      </td>
                    </tr>
                  )): ''}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal 
          action="delete" 
          title="Delete Student" 
          description="Do you really want to delete your account? This process cannot be undone" 
          handleOpen={handleOpen}
          handleAccept={handleDelete}    
          handleClose={handleClose}
          open={true}                      
        />
      </div>
    )
  }

export default Table