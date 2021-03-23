import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();

const WorkersTabel = () => {
  return <CreateCelledTable route="workers" />;
};

export default WorkersTabel;
