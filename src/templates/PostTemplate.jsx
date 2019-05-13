import { DiscussionEmbed } from 'disqus-react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
import Container from '../components/Container';
import media from 'styled-media-query';

const PostWrapper = styled.div`
  margin-bottom: 50px;
`;

const PostContainer = styled(Container)`
  max-width: 750px;
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
      markdownRemark,
      previous,
      next,
    },
  } = props;

  const {
    id,
    html,
    timeToRead,
    frontmatter: { title, tags, date, banner },
  } = markdownRemark;

  const disqusConfig = {
    title,
    identifier: id,
  };

  return (
    <Layout>
      <PostContainer>
        <PostWrapper>
          <Img fluid={banner.childImageSharp.fluid} />
          <Box m={40} />
          <PostHeading>{title}</PostHeading>
          <Paragraph>
            <PostField>
              <MdAccessTime />
              <span>{date}</span>
            </PostField>
            <PostField>
              <MdRemoveRedEye />
              <span>{timeToRead}</span>
            </PostField>
          </Paragraph>
          <PostContent html={html} />
          <Box mt={60} />
          <TagList tags={tags} />
          <Box mt={20} />
          <NavigatorWrapper>
            <div>
              {previous && (
                <Navigator className='prev' to={previous.frontmatter.path}>
                  <MdArrowBack size={24} />
                  <div>
                    <h2>이전 글</h2>
                    <h1>{previous.frontmatter.title}</h1>
                  </div>
                </Navigator>
              )}
            </div>
            <div>
              {next && (
                <Navigator className='next' to={next.frontmatter.path}>
                  <div>
                    <h2>다음 글</h2>
                    <h1>{next.frontmatter.title}</h1>
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
    markdownRemark(id: { eq: $id }) {
      id
      html
      timeToRead
      frontmatter {
        banner {
          childImageSharp {
            fluid(maxWidth: 1000, maxHeight: 450) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        path
        date(formatString: "YYYY-MM-DD")
        title
        tags
        author
      }
    }

    previous: markdownRemark(id: { eq: $previousId })
      @include(if: $hasPrevious) {
      frontmatter {
        title
        path
      }
    }

    next: markdownRemark(id: { eq: $nextId }) @include(if: $hasNext) {
      frontmatter {
        title
        path
      }
    }
  }
`;

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PostTemplate.defaultProps = {
  data: {},
};

export default PostTemplate;
