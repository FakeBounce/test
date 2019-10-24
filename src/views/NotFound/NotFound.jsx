import React from 'react'
import { translate } from "common/methods/translations";


const NotFound = () =>
  <div>
    <h3>404 Page not found</h3>
    <p>{translate('globals.error404') || 'We are sorry but the page you are looking for does not exist.'}</p>
  </div>

export default NotFound;
