import React from 'react';

import {loginFunction} from './loginFunction';


const CenteredTextPage = () => {
  return (
    <div>
      <button onClick={() =>
        loginFunction()
    }>redirect</button>
    </div>
  );
};

export default CenteredTextPage;