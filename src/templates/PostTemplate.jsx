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
  font-size: 16px;
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

const PostTemplate = ({ data }) => {
  const {
    markdownRemark: {
      html,
      timeToRead,
      frontmatter: { title, tags, date },
    },
  } = data;
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
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query findPostbyPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      timeToRead
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        tags
        author
      }
    }
  }
`;

PostTemplate.propTypes = {
  data: PropTypes.objectOf({
    markdownRemark: PropTypes.objectOf({
      id: PropTypes.string,
    }),
  }),
};

PostTemplate.defaultProps = {
  data: {},
};

export default PostTemplate;
