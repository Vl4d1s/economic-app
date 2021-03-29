import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';

const tabelKeys = [
  'Id',
  'First Name',
  'Last Name',
  'Gender',
  'Birth Date',
  'Start Job Date',
  'Salary',
  'Art14 Starting Date',
  'Art14%',
  'propValue',
  'Deposits',
  'Leaving Date',
  'payProp',
  'compCheck',
];

const WorkersTabel = () => {
  return <CreateCelledTable route="workers" tableName={'Workers Information 👷🏿‍♂️'} customTableKeys={tabelKeys} />;
};

export default WorkersTabel;
