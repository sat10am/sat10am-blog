import React from "react";

import ImageGallery from "react-image-gallery";
import PostCardList from "../components/PostCardList";
import Layout from "../components/layout";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import SEO from "../components/seo";
import img1 from "../images/1.jpeg";
import img2 from "../images/2.jpeg";
import img3 from "../images/3.jpeg";
import img4 from "../images/4.jpeg";
import img5 from "../images/5.jpeg";
import img6 from "../images/6.jpeg";

import "react-image-gallery/styles/css/image-gallery.css";

const images = [img1, img2, img3, img4, img5, img6].map(v => ({
  original: v,
  thumbnail: v,
}));

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`sat10am`, `application`, `react`]} />
    <ImageGallery items={images} />
    <Container>
      <PageHeader title="Post" />
      <PostCardList />
    </Container>
  </Layout>
);

export default IndexPage;
