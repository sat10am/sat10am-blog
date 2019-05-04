import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PageHeaderWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  h1 {
    color: #4b4b4b;
    font-size: 32px;
    padding-bottom: 10px;
  }
`;

const PageHeader = ({ title }) => (
  <PageHeaderWrapper>
    <h1>{title}</h1>
  </PageHeaderWrapper>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
