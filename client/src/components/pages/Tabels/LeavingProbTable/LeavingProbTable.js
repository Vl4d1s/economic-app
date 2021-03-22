import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();

const LeavingProbTable = () => {
  return <CreateCelledTable apiFunction={api.getLeavingProb} />;
};

export default LeavingProbTable;
