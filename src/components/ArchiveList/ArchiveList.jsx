import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Flex } from '@rebass/grid';

const ArchiveHeading = styled.h1`
  font-size: 1.3rem;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const ArchiveList = ({ archives }) => {
  return (
    <Flex flexWrap='wrap'>
      {archives.map(({ id, slidesUrl, title }) => (
        <Box width={[1, 1 / 2]} p={[1, 2]} key={id}>
          <iframe src={slidesUrl} width='100%' height='300px' title={title} />
          <ArchiveHeading>{title}</ArchiveHeading>
        </Box>
      ))}
    </Flex>
  );
};

ArchiveList.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      slidesUrl: PropTypes.string,
      title: PropTypes.string,
      week: PropTypes.number,
      description: PropTypes.string,
      publishAt: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
      author: PropTypes.shape({
        username: PropTypes.string,
        profile: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  ),
};

ArchiveList.defaultProps = {
  archives: [],
};

export default ArchiveList;
