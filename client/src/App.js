import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import Footer from './components/Footer/Footer';
import { Container } from 'semantic-ui-react';
import Routs from './components/Routs/Routs';
import './App.css';

class App extends Component {
  render() {
    return (
      <main>
        <Container
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
          }}
        >
          <Router>
            <HeaderMenu items={[['Compensation', '/compensation']]} headerIcon={'calculator'} />
            <div style={{ flex: '1' }}>
              <Routs />
            </div>
          </Router>
          <Footer />
        </Container>
      </main>
    );
  }
}

export default App;
