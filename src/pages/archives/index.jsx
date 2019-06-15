import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Container from '../../components/Container';
import ArchiveList from '../../components/ArchiveList';
import { Box } from '@rebass/grid';
import Banner from '../../components/Banner';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const ArchivePage = ({ data }) => {
  const archives = data.allStrapiArchive.edges;
  return (
    <Layout>
      <SEO title='Archives' keywords={[`gatsby`, `application`, `react`]} />
      <Banner imagePath='./images/archive_cover.jpeg' title='Archives' />
      <Container>
        <Box mt={40} />
        <ArchiveList archives={archives.map((e) => e.node)} />
      </Container>
    </Layout>
  );
};

ArchivePage.propTypes = {
  data: PropTypes.shape({
    allStrapiArchive: PropTypes.shape,
  }),
};

ArchivePage.defaultProps = {
  data: {},
};

export const pageQuery = graphql`
  query findAllArchives {
    allStrapiArchive {
      edges {
        node {
          id
          slidesUrl
          title
          week
          description
          publishAt(formatString: "YYYY.MM.DD")
          tags {
            name
          }
          author {
            username
            profile {
              url
            }
          }
        }
      }
    }
  }
`;

export default ArchivePage;
