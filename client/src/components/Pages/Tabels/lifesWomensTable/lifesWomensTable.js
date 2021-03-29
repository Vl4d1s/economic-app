import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';

const tabelKeys = ['Age', 'L(x)', 'd(x)', 'P(x)', 'q(x)'];

const lifesWomensTable = () => {
  return <CreateCelledTable route="lifetablewomens" tableName={'Womens Life Table 👩'} customTableKeys={tabelKeys} />;
};

export default lifesWomensTable;
