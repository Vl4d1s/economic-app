import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();

const InterestRateTable = () => {
  return <CreateCelledTable apiFunction={api.getInterestRate} />;
};

export default InterestRateTable;
