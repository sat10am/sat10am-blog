import React from 'react';

import PostList from '../../components/PostList';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Container from '../../components/Container';
import { Box } from '@rebass/grid';
import Banner from '../../components/Banner';

const PostPage = () => (
  <Layout>
    <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
    <Banner imagePath='./images/posts_cover.jpeg' title='Our Logs' />
    <Container>
      <Box mt={40} />
      <PostList />
    </Container>
  </Layout>
);

export default PostPage;
