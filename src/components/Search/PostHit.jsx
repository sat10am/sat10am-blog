import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import { Calendar } from 'styled-icons/octicons/Calendar';
import { Tags } from 'styled-icons/fa-solid/Tags';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MetaDataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContentsWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
`;

const DateWrapper = styled.div`
  display: flex;
`;

const TagWrapper = styled.div`
  display: flex;
`;

const HitLink = styled(Link)`
  display: block;
  text-decoration: none;
  font-weight: bold;
  color: inherit;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const StyledSnippet = styled(Snippet)`
  display: block;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
`;

const PostHit = (clickHandler) => ({ hit }) => (
  <Container>
    <MetaDataWrapper>
      <DateWrapper>
        <Calendar size='1em' />
        &nbsp;
        <Highlight attribute='date' hit={hit} tagName='mark' />
      </DateWrapper>
      &nbsp;&nbsp;
      <TagWrapper>
        <Tags size='1em' />
        &nbsp;
        {hit.tags.map((tag, index) => (
          <Fragment key={tag}>
            {index > 0 && ', '}
            <HitLink to={`posts/` + tag.toLowerCase().replace(` `, `-`)}>
              {tag}
            </HitLink>
          </Fragment>
        ))}
      </TagWrapper>
    </MetaDataWrapper>
    <ContentsWrapper>
      <HitLink to={hit.path} onClick={clickHandler}>
        <Title>
          <Highlight attribute='title' hit={hit} tagName='mark' />
        </Title>
      </HitLink>
      <StyledSnippet attribute='excerpt' hit={hit} tagName='mark' />
    </ContentsWrapper>
  </Container>
);

export default PostHit;
