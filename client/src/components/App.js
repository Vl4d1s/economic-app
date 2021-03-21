import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import Footer from "./Footer";
import { Container } from "semantic-ui-react";
import Routs from "./Routs";
class App extends Component {
  render() {
    return (
      <Container
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          marginTop: "1px",
        }}
      >
        <Router>
          <HeaderMenu
            items={[
              ["Page1", "/page1"],
              ["Tabels", "/tabels"],
            ]}
            headerIcon={"calculator"}
          />
          <div style={{ flex: "1" }}>
            <Routs />
          </div>
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
