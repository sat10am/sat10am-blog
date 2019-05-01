import React from "react";
import TagList from "../TagList";
import path from "path";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import { MdAccountCircle } from "react-icons/md";
import stripHtml from "../../utils/stripHtml";
import Link from "../Link";

const PostWrapper = styled.div`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;

const PostItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 1px 0.5px 0.5px #ccc;
`;

const PostItemWrapper = styled.div`
  padding-bottom: 10px;
  margin-bottom: 20px;
  width: 25%;
  padding: 10px;
  box-sizing: border-box;
`;

const PostItemBody = styled.div`
  color: #5d5d5d;
  padding-bottom: 10px;
  line-height: 18px;
  font-size: 12px;
`;

const PostItemHeader = styled.h1`
  font-size: 18px;
  color: #4b4b4b;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
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

const PostCardList = () => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 8
        ) {
          edges {
            node {
              id
              html
              frontmatter {
                title
                tags
                author
                path
                banner
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
                frontmatter: { title, tags, author, banner },
              },
            } = edge;
            return (
              <PostItemWrapper key={id}>
                <PostItem>
                  <PostItemHeader>
                    <Link to={path}>{title}</Link>
                  </PostItemHeader>
                  <TagList tags={tags} />
                  <PostItemBody>
                    {stripHtml(html)
                      .slice(0, 50)
                      .concat("...")}
                  </PostItemBody>
                  <ProfileWrapper>
                    <MdAccountCircle color="#4b4b4b" />
                    <ProfileItem>{author}</ProfileItem>
                  </ProfileWrapper>
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
