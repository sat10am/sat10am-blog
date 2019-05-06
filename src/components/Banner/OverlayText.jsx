import styled from 'styled-components';

const OverlayText = styled.span`
  position: absolute;
  display: inline-block;
  width: 480px;
  top: 50%;
  left: 50%;
  color: #d1d1d1;
  transform: translate(-15%, -50%);
  z-index: 1;
  font-size: 32px;
  font-family: 'Exo', -apple-system, sans-serif;
  font-weight: 600;
  text-align: right;
  line-height: 1.25;
`;

export default OverlayText;
