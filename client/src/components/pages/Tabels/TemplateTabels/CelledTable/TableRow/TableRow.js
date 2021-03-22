import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const TableRow = ({ item }) => {
  return (
    <Table.Row>
      {Object.keys(item).map(key => {
        return (
          <Table.Cell
            textAlign={['name', 'last_name'].includes(key) ? 'right' : 'center'}
            key={key}
            negative={item[key] === ''}
            singleLine
          >
            {item[key] === '' ? <Icon name="close" /> : null}
            {item[key]}
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
};

export default TableRow;
