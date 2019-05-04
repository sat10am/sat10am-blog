import React from "react";
import TagList from "../TagList";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import { MdAccessTime, MdAccountCircle } from "react-icons/md";
import stripHtml from "../../utils/stripHtml";
import Link from "../Link";
import { Box } from "@rebass/grid";
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

const PostImg = styled.img`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
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
                date(formatString: "YYYY.MM.DD")
                banner {
                  childImageSharp {
                    fluid(maxWidth: 400, maxHeight: 300) {
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
    render={data => {
      const { allMarkdownRemark } = data;
      return (
        <PostWrapper>
          {allMarkdownRemark.edges.map(edge => {
            const {
              node: {
                id,
                html,
                frontmatter: { title, tags, author, path, banner, date },
              },
            } = edge;
            return (
              <PostItemWrapper key={id}>
                <PostItem>
                  <PostImg src={banner.childImageSharp.fluid.src} alt="img" />
                  <PostItemHeader>
                    <Link to={path}>{title}</Link>
                  </PostItemHeader>
                  <TagList tags={tags} />
                  <PostItemBody>
                    {stripHtml(html)
                      .slice(0, 50)
                      .concat("...")}
                  </PostItemBody>
                  <DescriptionWrapper>
                    <MdAccountCircle color="#4b4b4b" />
                    <DescriptionItem>{author}</DescriptionItem>
                  </DescriptionWrapper>
                  <Box mt="5px" />
                  <DescriptionWrapper>
                    <MdAccessTime />
                    <DescriptionItem>{date}</DescriptionItem>
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
