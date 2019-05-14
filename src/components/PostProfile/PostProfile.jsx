import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TagList from '../TagList';

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
  color: #999;
  margin-bottom: 10px;
`;

const PostProfile = ({ member }) => (
  <ProfileWrapper>
    <ProfileImg src={member.profile} alt={member.username} />
    <div>
      <ProfileName>{member.username}</ProfileName>
      <ProfileDescription>
        여기는 간단한 소개가 들어갈 예정이에요
      </ProfileDescription>
      <TagList tags={member.skill} />
    </div>
  </ProfileWrapper>
);

PostProfile.propTypes = {
  member: PropTypes.shape({
    profile: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    skill: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PostProfile;
