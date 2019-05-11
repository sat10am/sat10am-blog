import React from 'react';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

import Header from './header';

const GlobalStyle = createGlobalStyle`
  ${reset} 
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');
  @import url('https://fonts.googleapis.com/css?family=Exo');
  html, body {
    font-family: 'Noto Sans KR';
  }
  main {
    padding-top: 60px;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <GlobalStyle />
        <div>
          <main>{children}</main>
        </div>
        <Footer />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
