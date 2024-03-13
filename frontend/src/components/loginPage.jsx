import React from 'react';

import {loginFunction} from '../functions/loginFunctions';


const LoginPage = () => {
  return (
    <div>
      <button onClick={() =>
        loginFunction()
    }>redirect</button>
    </div>
  );
};

export default LoginPage;