import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false };
    case 'open':
      return { open: true, size: action.size };
    default:
      throw new Error('Unsupported action...');
  }
}

const CompensationResults = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>
      <Button onClick={() => dispatch({ type: 'open', size: 'tiny' })}>Results</Button>
      <Modal size={size} open={open} onClose={() => dispatch({ type: 'close' })}>
        <Modal.Header>Your result:</Modal.Header>
        <Modal.Content>
          <p>Your compensation results:</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => dispatch({ type: 'close' })}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CompensationResults;
