import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import Footer from './components/Footer/Footer';
import { Container } from 'semantic-ui-react';
import Routs from './components/Routs/Routs';
class App extends Component {
  render() {
    return (
      <Container
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          marginTop: '1px',
        }}
      >
        <Router>
          <HeaderMenu items={[['Page1', '/page1']]} headerIcon={'calculator'} />
          <div style={{ flex: '1' }}>
            <Routs />
          </div>
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
