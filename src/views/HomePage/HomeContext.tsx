import { Student } from 'models';
import React, { useState } from 'react';



export interface IHomeContext {
  listStudent?: any;
  student?: Student; 
  pagination?: any;
  isLoading?: boolean;
}    

const INITIAL_VALUE: IHomeContext = {
  listStudent: [],
  student: {
    id: ''
  },
  pagination: {
    _totalRows: 0
  },
  isLoading: false
}


const HomeContext = React.createContext<[IHomeContext, any]>([INITIAL_VALUE, () => {}]);

const HomeContextProvider = (props: any) => {

  const [state, setState] = useState({...INITIAL_VALUE});  
  
  const { children } = props;

  return (
    <HomeContext.Provider value={[state, setState]}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeContextProvider };