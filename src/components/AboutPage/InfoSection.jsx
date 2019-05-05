import React from 'react';
import { InfoList, InfoItem, InfoLink } from './styled';
import { FaGithub, FaMapMarker } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

const InfoSection = () => (
  <section>
    <InfoList>
      <InfoItem>
        <FaGithub /> <span>Github : </span>
        <InfoLink
          href='https://github.com/sat10am'
          rel='noreferrer noopener'
          target='_blank'>
          https://github.com/sat10am
        </InfoLink>
      </InfoItem>
      <InfoItem>
        <MdMail /> <span>Email : </span>
        <InfoLink
          href='mailto:cream.doondoon@gmail.com'
          rel='noreferrer noopener'
          target='_blank'>
          cream.doondoon@gmail.com
        </InfoLink>
      </InfoItem>
      <InfoItem>
        <FaMapMarker /> <span>Where We are : </span>
        <InfoLink
          href='https://map.naver.com/local/siteview.nhn?code=367097766&_ts=1556984050672'
          rel='noreferrer noopener'
          target='_blank'>
          이매역 더 라이브러리
        </InfoLink>
      </InfoItem>
    </InfoList>
  </section>
);

export default InfoSection;
