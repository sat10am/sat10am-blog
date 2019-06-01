import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdLocalOffer } from 'react-icons/md';

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TagItem = styled.span`
  line-height: 12px;
  display: inline-block;
  background: #ffc66d;
  color: #aa4c00;
  font-size: 10px;
  padding: 5px;
  margin-right: 3px;
  border-radius: 3px;
`;

const TagList = ({ tags }) => (
  <TagWrapper>
    <MdLocalOffer style={{ marginRight: '5px' }} />
    {tags.map((tag) => (
      <TagItem key={tag}>{tag}</TagItem>
    ))}
  </TagWrapper>
);

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
