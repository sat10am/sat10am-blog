import React from 'react';
import TagList from '../TagList';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { MdAccountCircle, MdAccessTime } from 'react-icons/md';
import stripHtml from '../../utils/stripHtml';
import Link from '../Link';
import { Box } from '@rebass/grid';

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

const PostImg = styled.img`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const PostImgWrapper = styled.div`
  width: 250px;
  margin-right: 10px;
`;

const PostList = () => (
  <StaticQuery
    query={graphql`
      query PostListQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              id
              html
              frontmatter {
                title
                tags
                author
                path
                date(formatString: "YYYY.MM.DD")
                banner {
                  childImageSharp {
                    fluid(maxWidth: 250, maxHeight: 200) {
                      src
                      srcSet
                      sizes
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const { allMarkdownRemark } = data;
      return (
        <PostWrapper>
          {allMarkdownRemark.edges.map((edge) => {
            const {
              node: {
                id,
                html,
                frontmatter: { title, date, tags, author, path, banner },
              },
            } = edge;

            return (
              <PostItem key={id}>
                {banner && (
                  <PostImgWrapper>
                    <PostImg
                      style={{ width: 'auto' }}
                      src={banner.childImageSharp.fluid.src}
                    />
                  </PostImgWrapper>
                )}
                <div>
                  <PostItemHeader>
                    <Link to={path}>{title}</Link>
                  </PostItemHeader>
                  <TagList tags={tags} />
                  <PostItemBody>
                    {stripHtml(html)
                      .slice(0, 200)
                      .concat('...')}
                  </PostItemBody>
                  <DescriptionWrapper>
                    <MdAccountCircle color='#4b4b4b' />
                    <DescriptionItem>{author}</DescriptionItem>
                  </DescriptionWrapper>
                  <Box mt='5px' />
                  <DescriptionWrapper>
                    <MdAccessTime />
                    <DescriptionItem>{date}</DescriptionItem>
                  </DescriptionWrapper>
                </div>
              </PostItem>
            );
          })}
        </PostWrapper>
      );
    }}
  />
);

export default PostList;
