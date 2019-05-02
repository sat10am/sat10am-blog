import React from "react";

import styled from "styled-components";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import TagList from "../../components/TagList";
import { Flex, Box } from "@rebass/grid";
import { FaCalendar, FaGithub, FaMapMarker } from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import members from "../../members.json";

const A = styled.a`
  text-decoration: none;
  color: #4b4b4b;
`;
const ProfileItem = styled.li`
  font-size: 14px;
  color: #4b4b4b;
  margin-bottom: 5px;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const PostPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Box mt={20} />
    <Container>
      <PageHeader title="Members" />
      <Flex flexWrap="wrap">
        {members.map(({ name, profile, username, location, skill, join }) => (
          <Box width={1 / 2} p={10}>
            <Flex>
              <ProfileImg src={profile} alt="profile" />
              <Box ml={20} mb={20} fontSize={20} flex={2}>
                <Box mb={10}>
                  <h1>{name}</h1>
                </Box>
                <ul>
                  <ProfileItem>
                    <MdLabel />
                    <span style={{ marginLeft: "5px" }}>{username}</span>
                  </ProfileItem>
                  <ProfileItem>
                    <A
                      href="https://github.com/y0c"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <FaGithub />
                      <span style={{ marginLeft: "5px" }}>Github</span>
                    </A>
                  </ProfileItem>
                  <ProfileItem>
                    <FaMapMarker />
                    <span style={{ marginLeft: "5px" }}>{location}</span>
                  </ProfileItem>
                  <ProfileItem>
                    <FaCalendar />
                    <span style={{ marginLeft: "5px" }}>{join}</span>
                  </ProfileItem>
                </ul>
                <TagList tags={skill} />
              </Box>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Container>
  </Layout>
);

export default PostPage;
