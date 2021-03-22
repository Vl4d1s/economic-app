import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();

const WorkersTabel = () => {
  return <CreateCelledTable apiFunction={api.getWorkers} />;
};

export default WorkersTabel;
