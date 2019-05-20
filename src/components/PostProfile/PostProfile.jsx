import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdMail, MdMessage } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileName = styled.h1`
  font-size: 1.2rem;
  color: #4b4b4b;
  margin-bottom: 10px;
`;

const ProfileDescription = styled.span`
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  color: #999;
  margin-bottom: 5px;
  a {
    color: #999;
    text-decoration: none;
  }
  svg {
    color: #4b4b4b;
    margin-right: 5px;
  }
`;

const PostProfile = ({ member }) => (
  <ProfileWrapper>
    <ProfileImg src={member.profile.url} alt={member.username} />
    <div>
      <ProfileName>{member.username}</ProfileName>
      <ul>
        <li>
          <ProfileDescription>
            <MdMail />
            <a href={`mailto:${member.email}`} rel='noreferrer noopener'>
              {member.email}
            </a>
          </ProfileDescription>
        </li>
        <li>
          <ProfileDescription>
            <GoMarkGithub />
            <a
              href={member.githubUrl}
              target='_blank'
              rel='noreferrer noopener'>
              {member.githubUrl}
            </a>
          </ProfileDescription>
        </li>
        <li>
          <ProfileDescription>
            <MdMessage />
            {member.intro}
          </ProfileDescription>
        </li>
      </ul>
    </div>
  </ProfileWrapper>
);

PostProfile.propTypes = {
  member: PropTypes.shape({
    profile: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostProfile;
