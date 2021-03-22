import React, { useEffect, useState } from 'react';

import CelledTable from '../TemplateTabels/CelledTable/CelledTable';
import { createApiClient } from '../../../../api';

const api = createApiClient();

const WorkersTabel = () => {
  const [workersTable, setWorkersTable] = useState([]);
  const [tableKeys, setTableKeys] = useState([]);

  useEffect(() => {
    (async function () {
      const { workers } = await api.getWorkers();
      setWorkersTable(workers);
      setTableKeys(Object.keys(workers[0]));
    })();
  }, []);

  return (
    <div>
      <CelledTable columns={tableKeys.length > 0 ? tableKeys.length : 1} tableKeys={tableKeys} table={workersTable} />
    </div>
  );
};

export default WorkersTabel;
