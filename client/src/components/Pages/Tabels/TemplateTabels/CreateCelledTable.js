import React, { useEffect, useState } from 'react';

import CelledTable from './CelledTable/CelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();
const CreateCelledTable = ({ route, tableName }) => {
  const [table, setTable] = useState([]);
  const [tableKeys, setTableKeys] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await api.getData(route);
      setTable(data);
      setTableKeys(Object.keys(data[0]));
    })();
  }, []);

  return (
    <div>
      <CelledTable
        columns={tableKeys.length > 0 ? tableKeys.length : 1}
        tableKeys={tableKeys}
        table={table}
        tableName={tableName}
      />
    </div>
  );
};

export default CreateCelledTable;
