import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import TableRow from './TableRow/TableRow';

const TableExampleColumnCount = ({ columns, tableKeys, table }) => {
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
    <div>Loading...</div>
  );
};

TableExampleColumnCount.defaultProps = {
  columns: 1,
};
export default TableExampleColumnCount;
