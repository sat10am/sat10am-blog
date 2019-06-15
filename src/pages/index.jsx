import React from 'react';
import dayjs from 'dayjs';
import PostCardList from '../components/PostCardList';
import Layout from '../components/layout';
import PageHeader from '../components/PageHeader';
import Container from '../components/Container';
import Banner from '../components/Banner';
import SEO from '../components/seo';
import { Box } from '@rebass/grid';

const START_DATE = '2018-06-30';
const delta = dayjs().diff(dayjs(START_DATE), 'day');

const IndexPage = () => (
  <Layout>
    <SEO title='Home' keywords={[`sat10am`, `application`, `react`]} />
    <Banner
      imagePath='./images/main_cover.jpg'
      title={`WE ARE LIVING D+${delta} DAYS FROM 2018.06.30`}
    />
    <Container>
      <Box mt={40} />
      <PageHeader title='Post' />
      <PostCardList />
    </Container>
  </Layout>
);

export default IndexPage;
