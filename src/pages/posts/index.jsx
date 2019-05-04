import React from "react";

import PostList from "../../components/PostList";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";

const PostPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div style={{ marginTop: "20px" }} />
    <Container>
      <PageHeader title="Posts" />
      <PostList />
    </Container>
  </Layout>
);

export default PostPage;
