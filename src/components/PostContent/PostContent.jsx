import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ContentWrapper = styled.div`
  * {
    font-family: "Noto Sans KR";
  }
  p {
    margin-bottom: 15px;
    line-height: 24px;
    color: #4b4b4b;
  }

  ul {
    list-style: square;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    li {
      margin-bottom: 8px;
    }
  }

  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 26px;
  }
  h3 {
    font-size: 18px;
  }

  h1,
  h2 {
    color: #4b4b4b;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 5px;
  }
`;

const PostContent = ({ html }) => {
  return <ContentWrapper dangerouslySetInnerHTML={{ __html: html }} />;
};

PostContent.propTypes = {
  html: PropTypes.string.isRequired,
};

export default PostContent;
