const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`./src/templates/PostTemplate.jsx`);
  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          previous {
            id
          }
          node {
            id
            frontmatter {
              path
            }
          }
          next {
            id
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ previous, node, next }) => {
      const { id } = node;
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {
          id,
          hasPrevious: previous !== null,
          hasNext: next !== null,
          previousId: previous && previous.id,
          nextId: next && next.id,
        },
      });
    });
  });
};
