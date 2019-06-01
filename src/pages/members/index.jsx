import React from 'react';

import styled from 'styled-components';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Container from '../../components/Container';
import Text from '../../components/common/Text';
import Banner from '../../components/Banner';
import { Flex, Box } from '@rebass/grid';
import { FaGithub } from 'react-icons/fa';
import { useStaticQuery, graphql } from 'gatsby';
import { MdMail, MdAssignment } from 'react-icons/md';
import Img from 'gatsby-image';

const A = styled.a`
  text-decoration: none;
  color: #4b4b4b;
`;
const ProfileItem = styled.li`
  font-size: 14px;
  color: #4b4b4b;
  margin-bottom: 5px;
  line-height: 1.2rem;
`;

const ProfileImg = styled(Img)`
  border-radius: 50%;
`;

const Username = styled.h1`
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const PostPage = () => {
  const memberData = useStaticQuery(graphql`
    query findAllMember {
      allStrapiUser(filter: { username: { ne: "sat10am" } }) {
        edges {
          node {
            username
            email
            githubUrl
            intro
            profile {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  `);

  const memberList = memberData.allStrapiUser.edges.map((n) => n.node);
  return (
    <Layout>
      <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
      <Banner imagePath='./images/member_cover.jpeg' title='Our Members' />
      <Container>
        <Box mt={40} />
        <Flex flexWrap='wrap'>
          {memberList.map(({ username, email, githubUrl, intro, profile }) => (
            <Box width={[1, 1 / 2, 1 / 3]} p={[1, 2, 3]} key={username}>
              <Flex>
                <Box mb={20} fontSize={20} flex={2}>
                  <Flex justifyContent='center'>
                    <ProfileImg fixed={profile.childImageSharp.fixed} />
                  </Flex>
                  <Box mb={10} mt={15}>
                    <Username>@{username}</Username>
                  </Box>
                  <ul>
                    <ProfileItem>
                      <A
                        href={githubUrl}
                        target='_blank'
                        rel='noreferrer noopener'>
                        <FaGithub />
                        <Text ml='5px'>{githubUrl}</Text>
                      </A>
                    </ProfileItem>
                    <ProfileItem>
                      <MdMail />
                      <Text ml='5px'>{email}</Text>
                    </ProfileItem>
                    <ProfileItem>
                      <MdAssignment />
                      <Text ml='5px'>{intro}</Text>
                    </ProfileItem>
                  </ul>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Container>
    </Layout>
  );
};

export default PostPage;
