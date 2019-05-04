import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../images/sat10am.svg';
import Link from './Link';

const HeaderWrapper = styled.header`
  background: #ffffff;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 1px 0.5px 1px #ddd;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
  @media (min-width: 1200px) {
    width: 1100px;
  }

  @media (min-width: 768px) {
    width: 1000px;
  }
`;

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const LogoWrapper = styled.div`
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
`;

const LogoHeading = styled.h1`
  font-size: 24px;
  font-weight: 100;
  margin: 0;
  color: #4b4b4b;
  display: inline-block;
`;

const MenuWrapper = styled.div`
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
`;

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: table;
`;

const MenuItem = styled.li`
  display: table-cell;
  padding: 10px;
  color: #4b4b4b;
`;

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <LogoWrapper>
        <Link to='/'>
          <LogoImage src={Logo} alt='Logo' />
          <LogoHeading>{siteTitle}</LogoHeading>
        </Link>
      </LogoWrapper>
      <MenuWrapper>
        <MenuList>
          <MenuItem>
            <Link to='/posts'>Posts</Link>
          </MenuItem>
          <MenuItem>
            <Link to='/members'>Members</Link>
          </MenuItem>
          <MenuItem>
            <Link to='/about'>About</Link>
          </MenuItem>
        </MenuList>
      </MenuWrapper>
    </HeaderContainer>
  </HeaderWrapper>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
