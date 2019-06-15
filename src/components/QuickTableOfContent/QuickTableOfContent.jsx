import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import range from 'lodash/range';
import throttle from 'lodash/throttle';
import media from 'styled-media-query';

const QuickTableOfContentWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: -1rem;
  ${media.lessThan('large')`
    display: none;
  `}
`;

const Positioner = styled.div`
  position: fixed;
`;

const TableContentList = styled.ol`
  padding: 0;
  width: 200px;
  font-size: 0.8rem;
`;

const TableContentListItem = styled.li`
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  color: #ddd;
`;

const InternalLink = styled.a`
  color: #ddd;
  text-decoration: none;

  &.active {
    color: #4b4b4b;
  }
`;

const Gap = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

const QuickTableOfContent = ({ headingInfos }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = throttle(() => {
    const currentY = window.scrollY;
    const HEADER_GAP = 70;

    headingInfos.forEach((v, i) => {
      if (currentY >= v.top - HEADER_GAP) setActiveIndex(i);
    });
  }, 10);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headingInfos]);

  return (
    <QuickTableOfContentWrapper>
      <Positioner>
        <TableContentList>
          {headingInfos.map((h, i) => (
            <TableContentListItem key={h.id}>
              <InternalLink
                href={`#${h.id}`}
                className={i === activeIndex ? 'active' : ''}>
                {range(h.level - 1).map((v) => (
                  <Gap key={v} />
                ))}
                {h.text}
              </InternalLink>
            </TableContentListItem>
          ))}
        </TableContentList>
      </Positioner>
    </QuickTableOfContentWrapper>
  );
};

QuickTableOfContent.propTypes = {
  headingInfos: PropTypes.arrayOf(
    PropTypes.shape({
      top: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default QuickTableOfContent;
