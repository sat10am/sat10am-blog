import { DiscussionEmbed } from 'disqus-react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { MdAccessTime, MdRemoveRedEye } from 'react-icons/md';
import Layout from '../components/layout';
import TagList from '../components/TagList';
import PostContent from '../components/PostContent';
import Container from '../components/Container';

const PostHeading = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;
const Paragraph = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  color: #4b4b4b;
  font-size: 12px;
`;

const PostField = styled.span`
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

const PostTemplate = (props) => {
  const {
    data: {
      site: { siteMetadata },
      markdownRemark,
    },
  } = props;

  const {
    id,
    html,
    timeToRead,
    frontmatter: { title, tags, date },
  } = markdownRemark;

  const disqusConfig = {
    title,
    identifier: id,
  };

  return (
    <Layout>
      <div style={{ marginTop: '20px' }} />
      <Container>
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
        <TagList tags={tags} />
        <DiscussionEmbed
          config={disqusConfig}
          shortname={siteMetadata.shortname}
        />
      </Container>
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
