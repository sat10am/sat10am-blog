import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../images/sat10am.svg';
import Link from './Link';
import Search from './Search';

const HeaderWrapper = styled.header`
  background: #333;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  width: 140px;
  margin-right: 10px;
`;

const LogoWrapper = styled.div`
  height: 100%;
  flex-basis: 75%;
  display: flex;
  align-items: center;
`;

const LogoHeading = styled.h1`
  font-size: 24px;
  font-weight: 100;
  margin: 0;
  color: #ffffff;
  display: inline-block;
`;

const SearchWrapper = styled.div``;

const MenuWrapper = styled.div`
  height: 100%;
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
`;

const HeaderLink = styled(Link)`
  color: #ffffff;
  &:visited {
    color: #ffffff;
  }
`;

const searchIndices = [
  // { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
];

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <LogoWrapper>
        <HeaderLink to='/'>
          <LogoImage src={Logo} alt='Logo' />
        </HeaderLink>
      </LogoWrapper>
      <MenuWrapper>
        <MenuList>
          <MenuItem>
            <HeaderLink to='/posts'>Posts</HeaderLink>
          </MenuItem>
          <MenuItem>
            <HeaderLink to='/members'>Members</HeaderLink>
          </MenuItem>
          <MenuItem>
            <HeaderLink to='/about'>About</HeaderLink>
          </MenuItem>
        </MenuList>
      </MenuWrapper>
      <SearchWrapper>
        <Search collapse indices={searchIndices} />
      </SearchWrapper>
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
