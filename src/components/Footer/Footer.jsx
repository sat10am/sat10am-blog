import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  height: 30px;
  background: #4b4b4b;
  color: white;
  text-align: center;
  font-size: 12px;
  padding: 10px;
`;

const Footer = () => (
  <FooterWrapper>© {new Date().getFullYear()}, Built with @y0c</FooterWrapper>
);

export default Footer;
