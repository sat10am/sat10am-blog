import React from 'react';
import TagList from '../TagList';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { MdAccountCircle, MdAccessTime } from 'react-icons/md';
import stripHtml from '../../utils/stripHtml';
import Link from '../Link';
import { Box } from '@rebass/grid';
import Img from 'gatsby-image';

const PostWrapper = styled.div`
  margin: 0;
`;

const PostItem = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  display: flex;
`;

const PostItemBody = styled.div`
  color: #5d5d5d;
  padding-bottom: 10px;
  line-height: 24px;
`;

const PostItemHeader = styled.h1`
  font-size: 18px;
  color: #4b4b4b;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DescriptionItem = styled.span`
  font-size: 12px;
  margin-left: 4px;
  color: #4b4b4b;
`;

const PostImg = styled(Img)`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const PostImgWrapper = styled.div`
  width: 250px;
  margin-right: 10px;
`;

const PostContentWrapper = styled.div`
  flex: 2;
`;

const PostList = () => (
  <StaticQuery
    query={graphql`
      query {
        allPost(sort: { order: DESC, fields: [publishAt] }) {
          edges {
            node {
              title
              childMarkdownRemark {
                html
              }
              slug
              publishAt(formatString: "YYYY.MM.DD")
              tags {
                name
              }
              author {
                username
                profile {
                  url
                }
              }
              thumbnail {
                childImageSharp {
                  fixed(width: 250, height: 200) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const { allPost } = data;
      return (
        <PostWrapper>
          {allPost.edges.map((edge) => {
            const {
              node: {
                id,
                title,
                childMarkdownRemark: { html },
                slug,
                tags,
                thumbnail,
                author,
                publishAt,
              },
            } = edge;

            return (
              <PostItem key={id}>
                {thumbnail && (
                  <PostImgWrapper>
                    <PostImg fixed={thumbnail.childImageSharp.fixed} />
                  </PostImgWrapper>
                )}
                <PostContentWrapper>
                  <PostItemHeader>
                    <Link to={slug}>{title}</Link>
                  </PostItemHeader>
                  <TagList tags={tags.map((t) => t.name)} />
                  <PostItemBody>
                    {stripHtml(html)
                      .slice(0, 200)
                      .concat('...')}
                  </PostItemBody>
                  <DescriptionWrapper>
                    <MdAccountCircle color='#4b4b4b' />
                    <DescriptionItem>{author.username}</DescriptionItem>
                  </DescriptionWrapper>
                  <Box mt='5px' />
                  <DescriptionWrapper>
                    <MdAccessTime />
                    <DescriptionItem>{publishAt}</DescriptionItem>
                  </DescriptionWrapper>
                </PostContentWrapper>
              </PostItem>
            );
          })}
        </PostWrapper>
      );
    }}
  />
);

export default PostList;
