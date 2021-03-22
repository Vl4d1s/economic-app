import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();

const lifesWomensTable = () => {
  return <CreateCelledTable apiFunction={api.getLifesWomens} />;
};

export default lifesWomensTable;
