import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;
const Container = ({ children }) => (
  <ContainerWrapper>{children}</ContainerWrapper>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Container;
