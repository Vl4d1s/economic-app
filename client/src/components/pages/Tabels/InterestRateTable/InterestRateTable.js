import React, { useEffect, useState } from 'react';

import CelledTable from '../TemplateTabels/CelledTable/CelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();

const InterestRateTable = () => {
  const [interestRateTable, setInterestRateTable] = useState([]);
  const [tableKeys, setTableKeys] = useState([]);

  useEffect(() => {
    (async function () {
      const { interestRate } = await api.getInterestRate();
      setInterestRateTable(interestRate);
      setTableKeys(Object.keys(interestRate[0]));
      console.log(interestRate);
    })();
  }, []);

  return (
    <div>
      <CelledTable
        columns={tableKeys.length > 0 ? tableKeys.length : 1}
        tableKeys={tableKeys}
        table={interestRateTable}
      />
    </div>
  );
};

export default InterestRateTable;
