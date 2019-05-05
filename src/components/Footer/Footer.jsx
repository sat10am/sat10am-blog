import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  height: 30px;
  background: #4b4b4b;
  color: white;
  text-align: center;
  font-size: 12px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => (
  <FooterWrapper>© {new Date().getFullYear()}, Built with @ SAT10AM </FooterWrapper>
);

export default Footer;
