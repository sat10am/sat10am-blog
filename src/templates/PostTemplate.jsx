import { DiscussionEmbed } from 'disqus-react';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import map from 'lodash/map';
import { graphql } from 'gatsby';
import {
  MdAccessTime,
  MdRemoveRedEye,
  MdArrowBack,
  MdArrowForward,
} from 'react-icons/md';
import { Box } from '@rebass/grid';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Link from '../components/Link';
import TagList from '../components/TagList';
import PostContent from '../components/PostContent';
import PostProfile from '../components/PostProfile';
import Container from '../components/Container';
import QuickTableOfContent from '../components/QuickTableOfContent';
import media from 'styled-media-query';

const PostWrapper = styled.div`
  margin-bottom: 50px;
`;

const PostContainer = styled(Container)`
  max-width: 750px;
  position: relative;
`;

const PostHeading = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;
const Paragraph = styled.p`
  margin-top: 20px;
  margin-bottom: 30px;
  color: #4b4b4b;
  font-size: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const PostField = styled.span`
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

const NavigatorWrapper = styled.div`
  display: flex;
  ${media.greaterThan('small')`
    justify-content: space-between;
  `}
  ${media.lessThan('small')`
    flex-direction: column;
  `}
`;

const Navigator = styled(Link)`
  display: flex;
  align-items: center;
  padding: 20px;
  &.prev {
    padding-left: 0px;
    svg {
      margin-right: 10px;
    }
  }
  &.next {
    padding-right: 0px;
    svg {
      margin-left: 10px;
    }
    justify-content: flex-end;
  }

  ${media.lessThan('small')`
    justify-content: center !important; 
  `}

  h2 {
    margin-bottom: 8px;
  }
`;

const PostTemplate = (props) => {
  const {
    data: {
      site: { siteMetadata },
      post,
      previous,
      next,
    },
  } = props;

  const {
    id,
    title,
    childMarkdownRemark: { html },
    view,
    publishAt,
    thumbnail,
    author,
    tags,
  } = post;

  const disqusConfig = {
    title,
    identifier: id,
  };

  const [headingInfos, setHeadingInfos] = useState([]);

  const contentRef = useRef(null);

  useEffect(() => {
    const headings = contentRef.current.querySelectorAll('h1, h2, h3');
    setHeadingInfos(
      map(headings, (h) => ({
        top: h.getBoundingClientRect().top,
        level: h.tagName.slice(1),
        text: h.innerText,
        id: h.id,
      })),
    );
  }, []);

  return (
    <Layout>
      <PostContainer>
        <QuickTableOfContent headingInfos={headingInfos} />
        <PostWrapper>
          {thumbnail && <Img fluid={thumbnail.childImageSharp.fluid} />}
          <Box m={40} />
          <PostHeading>{title}</PostHeading>
          <Paragraph>
            <PostField>
              <MdAccessTime />
              <span>{publishAt}</span>
            </PostField>
            <PostField>
              <MdRemoveRedEye />
              <span>{view}</span>
            </PostField>
          </Paragraph>
          <PostContent html={html} ref={contentRef} />
          <Box mt={30} />
          <TagList tags={tags.map((t) => t.name)} />
          <Box mt={30} />
          <PostProfile member={author} />
          <Box mt={30} />
          <NavigatorWrapper>
            <div>
              {previous && (
                <Navigator className='prev' to={previous.slug}>
                  <MdArrowBack size={24} />
                  <div>
                    <h2>이전 글</h2>
                    <h1>{previous.title}</h1>
                  </div>
                </Navigator>
              )}
            </div>
            <div>
              {next && (
                <Navigator className='next' to={next.slug}>
                  <div>
                    <h2>다음 글</h2>
                    <h1>{next.title}</h1>
                  </div>
                  <MdArrowForward size={24} />
                </Navigator>
              )}
            </div>
          </NavigatorWrapper>
          <Box mt={40} />
          <DiscussionEmbed
            config={disqusConfig}
            shortname={siteMetadata.shortname}
          />
          <Box mt={100} />
        </PostWrapper>
      </PostContainer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query findPostById(
    $id: String!
    $hasPrevious: Boolean!
    $hasNext: Boolean!
    $previousId: String
    $nextId: String
  ) {
    site {
      siteMetadata {
        siteUrl
        shortname
      }
    }
    post(id: { eq: $id }) {
      id
      title
      view
      slug
      publishAt(formatString: "YYYY.MM.DD")
      tags {
        name
      }
      childMarkdownRemark {
        html
      }
      author {
        username
        intro
        email
        github
        profile {
          url
        }
      }
      thumbnail {
        childImageSharp {
          fluid(maxWidth: 700, maxHeight: 450) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }

    previous: post(id: { eq: $previousId }) @include(if: $hasPrevious) {
      title
      slug
    }

    next: post(id: { eq: $nextId }) @include(if: $hasNext) {
      title
      slug
    }
  }
`;

PostTemplate.propTypes = {
  data: PropTypes.shape({
    strapiPost: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PostTemplate.defaultProps = {
  data: {},
};

export default PostTemplate;
