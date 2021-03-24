import React from 'react';
import { Table } from 'semantic-ui-react';
import TableRow from './TableRow/TableRow';
import CircularLoader from '../../../../CircularLoader/CircularLoader';

const CelledTable = ({ columns, tableKeys, table }) => {
  return table && table.length > 0 ? (
    <Table columns={columns} celled compact size="small">
      <Table.Header>
        <Table.Row>
          {tableKeys &&
            tableKeys.map((key, title) => {
              return (
                <Table.HeaderCell textAlign="center" key={title}>
                  {key}
                </Table.HeaderCell>
              );
            })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {table.map((item, index) => {
          return <TableRow key={index} item={item} />;
        })}
      </Table.Body>
    </Table>
  ) : (
    <CircularLoader />
  );
};

CelledTable.defaultProps = {
  columns: 1,
};
export default CelledTable;
