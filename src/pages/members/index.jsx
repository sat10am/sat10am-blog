import React from 'react';

import styled from 'styled-components';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Container from '../../components/Container';
import Text from '../../components/common/Text';
import Banner from '../../components/Banner';
import TagList from '../../components/TagList';
import { Flex, Box } from '@rebass/grid';
import { FaGithub } from 'react-icons/fa';
import { useStaticQuery, graphql } from 'gatsby';
import { MdMail } from 'react-icons/md';
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const IntroText = styled.pre`
  color: #555;
`;

const MembersPage = () => {
  const memberData = useStaticQuery(graphql`
    query findAllMember {
      allStrapiAuthor {
        edges {
          node {
            username
            email
            github
            intro
            tags {
              name
            }
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

  const memberList = memberData.allStrapiAuthor.edges.map((n) => n.node);
  return (
    <Layout>
      <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
      <Banner imagePath='./images/member_cover.jpeg' title='Our Members' />
      <Container>
        <Box mt={40} />
        <Flex flexWrap='wrap'>
          {memberList.map(
            ({ username, email, github, intro, profile, tags }) => (
              <Box width={[1, 1 / 2, 1 / 3]} p={[1, 2, 3]} key={username}>
                <Flex>
                  <Box mb={20} fontSize={20} flex={2}>
                    <Flex justifyContent='center'>
                      <ProfileImg fixed={profile.childImageSharp.fixed} />
                    </Flex>
                    <Box mb={10} mt={15}>
                      <Username>
                        <Text>@{username}</Text>
                        <A
                          href={github}
                          target='_blank'
                          rel='noreferrer noopener'>
                          <FaGithub />
                        </A>
                      </Username>
                    </Box>
                    <ul>
                      <ProfileItem>
                        <A href={`mailto:${email}`}>
                          <MdMail />
                          <Text ml='5px'>{email}</Text>
                        </A>
                      </ProfileItem>
                      {intro && (
                        <ProfileItem>
                          <IntroText>{intro}</IntroText>
                        </ProfileItem>
                      )}
                      <ProfileItem>
                        <TagList tags={tags.map((t) => t.name)} />
                      </ProfileItem>
                    </ul>
                  </Box>
                </Flex>
              </Box>
            ),
          )}
        </Flex>
      </Container>
    </Layout>
  );
};

export default MembersPage;
