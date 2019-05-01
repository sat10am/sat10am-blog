import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import { MdLocalOffer, MdAccountCircle } from "react-icons/md";
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

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TagItem = styled.span`
  display: inline-block;
  background: skyblue;
  font-size: 10px;
  padding: 5px;
  margin-right: 3px;
  border-radius: 3px;
`;

const TagList = ({ tags }) => (
  <TagWrapper>
    <MdLocalOffer style={{ marginRight: "5px" }} />
    {tags.map(tag => (
      <TagItem key={tag}>{tag}</TagItem>
    ))}
  </TagWrapper>
);

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileItem = styled.span`
  font-size: 12px;
  margin-left: 4px;
  color: #4b4b4b;
`;

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

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
                frontmatter: { title, tags, author },
              },
            } = edge;

            console.log(author);
            return (
              <PostItem key={id}>
                <PostItemHeader>
                  <Link>{title}</Link>
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
