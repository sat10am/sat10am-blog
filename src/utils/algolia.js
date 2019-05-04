const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/contents/" },
    }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          path
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/contents/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          date(formatString: "MMM DD, YYYY")
          tags
          path
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const flatten = (arr) =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }));
const settings = { attributesToSnippet: [`excerpt:20`] };

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `Pages`,
    settings,
  },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
];

module.exports = queries;
