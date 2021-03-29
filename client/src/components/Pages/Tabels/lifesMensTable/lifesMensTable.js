import React from 'react';

import CreateCelledTable from '../TemplateTabels/CreateCelledTable';

const tabelKeys = ['Age', 'L(x)', 'd(x)', 'P(x)', 'q(x)'];

const lifesMensTable = () => {
  return <CreateCelledTable route="lifetablemens" tableName={'Mens Life Table 👨'} customTableKeys={tabelKeys} />;
};

export default lifesMensTable;
