import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FormNewDidactico } from './views/FormNewDidactico';


ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <FormNewDidactico  
      edit
      initialValues={
        {numero:'123',tipo:'mapa',titulo:'la conquista',existencias:12,pdf:null,img:null,tags:'cosas cosas2 1'}
      }
    />
  </React.StrictMode>,
  document.getElementById('root')
);


