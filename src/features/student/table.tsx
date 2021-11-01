import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Code', width: 180 },
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 180,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    type: 'string',
    width: 180,
    editable: true,
  },
  {
    field: 'mark',
    headerName: 'Mark',
    type: 'number',
    width: 180,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Action',
    type: 'string',
    width: 200,
  }
];

interface StudentProps {
  id?: string;
  name?: string;
  age?: number;
  mark?: number;
  gender?: 'male' | 'female';
  city?: string;
  createdAt?: number;
  updatedAt?: number;
}

export default function DataTable() {
  const listUser : any = useAppSelector(state => state.student.listUser);
  console.log('listUser', listUser.length);
  
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={listUser?.length > 0 ? listUser : []}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
