import React from "react";
import TagList from "../TagList";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import { MdAccountCircle } from "react-icons/md";
import stripHtml from "../../utils/stripHtml";
import Link from "../Link";

const PostWrapper = styled.div`
  margin: 0;
`;

const PostItem = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
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

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileItem = styled.span`
  font-size: 12px;
  margin-left: 4px;
  color: #4b4b4b;
`;

const PostList = () => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
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
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { allMarkdownRemark } = data;
      return (
        <PostWrapper>
          {allMarkdownRemark.edges.map(edge => {
            const {
              node: {
                id,
                html,
                frontmatter: { title, tags, author, path },
              },
            } = edge;

            return (
              <PostItem key={id}>
                <PostItemHeader>
                  <Link to={path}>{title}</Link>
                </PostItemHeader>
                <TagList tags={tags} />
                <PostItemBody>
                  {stripHtml(html)
                    .slice(0, 300)
                    .concat("...")}
                </PostItemBody>
                <ProfileWrapper>
                  <MdAccountCircle color="#4b4b4b" />
                  <ProfileItem>{author}</ProfileItem>
                </ProfileWrapper>
              </PostItem>
            );
          })}
        </PostWrapper>
      );
    }}
  />
);

export default PostList;
