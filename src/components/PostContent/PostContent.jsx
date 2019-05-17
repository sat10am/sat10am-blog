import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'github-markdown-css';

const ContentWrapper = styled.div`
  code.language-text {
    background: #eee;
    color: #c77532;
  }

  h1,
  h2,
  h3 {
    padding-top: 24px;
  }

  ul,
  ol {
    list-style: initial;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #171717;
  }

  .gatsby-highlight {
    position: relative;
    box-sizing: border-box;

    pre {
      padding-top: 30px;
    }

    code.language-text {
      background: #171717;
      color: #a9b7c6;
    }
    .line-numbers-rows {
      padding-left: 3px;
    }
  }

  .gatsby-highlight::before {
    content: attr(data-language);
    display: block;
    position: absolute;
    top: 0px;
    right: 20px;
    height: 20px;
    font-size: 12px;
    text-transform: uppercase;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 1px 5px;
    background: #ffc66d;
    color: #aa4c00;
    font-weight: 500;
    z-index: 9;
  }

  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding-left: 2.8em;
  }

  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding: 0;
    padding-left: 2.8em;
    overflow: initial;
  }
`;

const PostContent = React.forwardRef(({ html }, ref) => {
  return (
    <ContentWrapper
      ref={ref}
      className='markdown-body'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

PostContent.propTypes = {
  html: PropTypes.string.isRequired,
};

export default PostContent;
