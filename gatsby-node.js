const path = require('path');
const crypto = require('crypto');

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig();
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    };
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`./src/templates/PostTemplate.jsx`);
  return graphql(`
    query {
      allPost(sort: { order: DESC, fields: [publishAt] }) {
        edges {
          previous {
            id
          }
          node {
            id
            slug
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

    result.data.allPost.edges.forEach(({ previous, node, next }) => {
      const { id } = node;
      createPage({
        path: node.slug,
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

const digest = (data) => {
  return crypto
    .createHash(`md5`)
    .update(JSON.stringify(data))
    .digest(`hex`);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNode } = actions;
  if (node.internal.type === 'StrapiPost') {
    createNode({
      ...node,
      id: `${node.id}-markdown`,
      parent: node.id,
      children: [],
      internal: {
        type: 'Post',
        mediaType: 'text/markdown',
        content: node.content,
        contentDigest: digest(node),
      },
    });
  }
};
