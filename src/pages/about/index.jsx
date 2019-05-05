import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Container from '../../components/Container';
import Banner from '../../components/Banner';
import { Box } from '@rebass/grid';
import PageHeader from '../../components/PageHeader';
import InfoSection from './InfoSection';
import ImageGallery from './ImageGallery';
import {
  PhotoCaption,
  IntroParagraph,
  LogoWrapper,
  AboutLogo,
  Strong,
} from './styled';

const AboutPage = () => (
  <Layout>
    <SEO title='About' keywords={[`sat10am`, `javascript`, `react`]} />
    <Banner imagePath='./images/about_cover.jpg' />
    <LogoWrapper>
      <AboutLogo src='./images/sat10am_about_logo.png' alt='about_logo' />
    </LogoWrapper>
    <Container>
      <Box mt={40} />
      <IntroParagraph>
        <Strong>SAT10AM</Strong>은 <Strong>매주 토요일 오전 10시</Strong>에 웹
        개발에 관련된 주제로
        <br />
        공부하고 발표하는 <Strong>기술 스터디 모임</Strong>
        입니다.
      </IntroParagraph>
      <Box mt={40} />
      <InfoSection />
      <Box mt={60} />
      <PageHeader title='Photos' />
      <ImageGallery />
      <Box mt={40} />
      <PhotoCaption>
        <span role='img' aria-label='emoji'>
          👨‍👩‍👧‍👦
        </span>
        51 Labors Hackerton - 2019.05.01
      </PhotoCaption>
      <Box mt={40} />
    </Container>
  </Layout>
);

export default AboutPage;
