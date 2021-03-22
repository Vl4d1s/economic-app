import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();

const lifesMensTable = () => {
  return <CreateCelledTable apiFunction={api.getLifesMens} />;
};

export default lifesMensTable;
