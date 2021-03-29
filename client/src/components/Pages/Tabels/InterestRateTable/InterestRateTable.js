import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';

const tabelKeys = ['Year', 'Discount Rate'];

const InterestRateTable = () => {
  return <CreateCelledTable route="interestrate" tableName={'Interest Rate 📈'} customTableKeys={tabelKeys} />;
};

export default InterestRateTable;
