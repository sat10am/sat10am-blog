import React from 'react';
import TagList from '../TagList';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { MdAccessTime, MdAccountCircle } from 'react-icons/md';
import stripHtml from '../../utils/stripHtml';
import Link from '../Link';
import { Box } from '@rebass/grid';
import Img from 'gatsby-image';

const PostWrapper = styled.div`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: -5px;
`;

const PostItem = styled.div`
  padding: 10px;
`;

const PostItemWrapper = styled.div`
  padding-bottom: 10px;
  margin-bottom: 20px;
  width: 33.333%;
  box-sizing: border-box;
`;

const PostItemBody = styled.div`
  color: #5d5d5d;
  padding-bottom: 10px;
  line-height: 18px;
  font-size: 12px;
`;

const PostItemHeader = styled.h1`
  font-size: 20px;
  color: #4b4b4b;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
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

const PostImgWrapper = styled.div`
  width: 300px;
  margin-right: 10px;
`;

const PostImg = styled(Img)`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const PostCardList = () => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        allPost(sort: { order: DESC, fields: [publishAt] }, limit: 8) {
          edges {
            node {
              id
              title
              childMarkdownRemark {
                html
              }
              tags {
                name
              }
              slug
              publishAt(formatString: "YYYY.MM.DD")
              thumbnail {
                childImageSharp {
                  fixed(width: 300, height: 200) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              author {
                username
                profile {
                  url
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
                publishAt,
                thumbnail,
                tags,
                author,
              },
            } = edge;
            return (
              <PostItemWrapper key={id}>
                <PostItem>
                  {thumbnail && (
                    <PostImgWrapper>
                      <PostImg fixed={thumbnail.childImageSharp.fixed} />
                    </PostImgWrapper>
                  )}
                  <PostItemHeader>
                    <Link to={slug}>{title}</Link>
                  </PostItemHeader>
                  <TagList tags={tags.map((t) => t.name)} />
                  <PostItemBody>
                    {stripHtml(html)
                      .slice(0, 50)
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
                </PostItem>
              </PostItemWrapper>
            );
          })}
        </PostWrapper>
      );
    }}
  />
);

export default PostCardList;
