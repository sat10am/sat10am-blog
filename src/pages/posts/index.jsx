import React from "react";

import PostList from "../../components/PostList";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <PostList />
  </Layout>
);

export default IndexPage;
