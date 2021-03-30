import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import SCE from '../../assets/SCE.png';

const Footer = () => (
  <div>
    <br />
    <Container fluid textAlign="center">
      Made by: Vladis, Daniel, Sapir, Lihi and Inbal.
      <Image src={SCE} size="mini" spaced />
      College of engineering.
      <br />
      For programming applications in economics course by Dr. Anna Mirochnik.
    </Container>
    <br />
  </div>
);

export default Footer;
