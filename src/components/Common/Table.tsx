import { Student } from "models"
import React, { useState } from "react";
import Pagination from "./Pagination";

interface Props {
    listStudent: any;
    onEdit: any;
}

const Table: React.FC<Props> = ({listStudent, onEdit}) => {

    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-y-scroll sm:rounded-lg ">
              <table className="min-w-full divide-y divide-gray-20">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                    >
                      Discription
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative text-gray-500 px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-20">
                  { listStudent !== null ? listStudent.data?.map((student: Student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {student.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        vv
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm ">
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
      </div>
    )
  }

export default Table