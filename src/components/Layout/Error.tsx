import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';


function Error({}) {

  return (
    <div>
    </div>
  );
}

Error.propTypes = {
  route: PropTypes.object
};

export default Error;
