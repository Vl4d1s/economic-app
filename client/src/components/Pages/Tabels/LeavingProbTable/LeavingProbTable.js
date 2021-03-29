import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';

const tabelKeys = ['Ages', 'Dismissal', 'Resignation'];

const LeavingProbTable = () => {
  return (
    <CreateCelledTable
      route="leavingprob"
      tableName={'The probability of leaving the job 📊'}
      customTableKeys={tabelKeys}
    />
  );
};

export default LeavingProbTable;
