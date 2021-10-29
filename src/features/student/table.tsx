import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';

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

export default function DataTable(item: any) {
  console.log(item);
  
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={item?.name?.length>0 ? item.name : []}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
