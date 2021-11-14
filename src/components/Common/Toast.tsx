import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    toast.configure({
      autoClose: 2000,
      draggable: false,
      position: toast.POSITION.TOP_LEFT
    })
    toast.success('🦄 Wow so easy!', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify = () => toast('Wow so easy !');

  return (
    <div className="App">
      <button onClick={notify}>Notify !</button>
      cc
    </div>
  );
};

export default Toast;
