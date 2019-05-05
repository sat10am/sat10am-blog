import styled, { css } from 'styled-components';
import { Search } from 'styled-icons/fa-solid/Search';

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`;

export const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
`;

const focussed = css`
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme.darkBlue};
  cursor: text;
  width: 5em;
  + ${SearchIcon} {
    color: ${(props) => props.theme.darkBlue};
    margin: 0.3em;
  }
`;

const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${(props) => props.theme.lightBlue};
  + ${SearchIcon} {
    color: ${(props) => props.theme.white};
  }
  ${(props) => props.focused && focussed}
  margin-left: ${(props) => (props.focused ? `-1.6em` : `-1em`)};
  padding-left: ${(props) => (props.focused ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${(props) => props.theme.gray};
  }
`;

const expand = css`
  background: ${(props) => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: ${(props) => props.theme.shortTrans};
  border-radius: ${(props) => props.theme.smallBorderRadius};
  ${(props) => (props.collapse ? collapse : expand)};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const list = css`
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: calc(4em + 40vw);
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: ${(props) => props.theme.white};
  border-radius: ${(props) => props.theme.smallBorderRadius};
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid ${(props) => props.theme.darkGray};
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${(props) => props.theme.lightGray};
  }
`;

const grid = css`
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    grid-gap: 1em;
    li {
      padding: 0.3em 0.5em;
      background: ${(props) => props.theme.veryLightGray};
      border-radius: ${(props) => props.theme.smallBorderRadius};
    }
  }
`;

export const HitsWrapper = styled.div`
  display: ${(props) => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  background-color: #fff;
  ${(props) => (props.hitsAsGrid ? grid : list)};
  div {
    overflow: hidden;
    white-space: nowrap;
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
    li:last-child {
      margin-bottom: 1.25rem;
    }
  }
  mark {
    color: ${(props) => props.theme.lightBlue};
    background: ${(props) => props.theme.darkBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    h3 {
      color: ${(props) => props.theme.white};
      background: ${(props) => props.theme.gray};
      border-radius: ${(props) => props.theme.smallBorderRadius};
    }
  }
`;

export const By = styled.span`
  font-size: 0.6em;
  text-align: end;
  padding: 0;
`;
