import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OverlayText from './OverlayText';

const BannerWrapper = styled.div`
  position: relative;
  height: 350px;
  background-image: url(${(props) => props.imagePath});
  background-size: cover;
  background-position: center;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    opacity: 1;
  }
`;

/**
 * Simple Image Banner Component
 * @param imagePath
 * @param children
 */
const Banner = ({ imagePath, title }) => (
  <BannerWrapper imagePath={imagePath}>
    <OverlayText>{title}</OverlayText>
  </BannerWrapper>
);

Banner.propTypes = {
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Banner;
