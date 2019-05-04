import React from "react";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import { Box } from "@rebass/grid";

const AboutPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Box mt={20} />
    <Container>
      <PageHeader title="About" />
    </Container>
  </Layout>
);

export default AboutPage;
