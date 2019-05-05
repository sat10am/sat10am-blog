import React from 'react';
import Gallery from 'react-grid-gallery';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const GalleryWrapper = styled.div`
  overflow: hidden;
`;

/**
 * ImageGallery
 * @description file size가 너무 커서 로딩이 느려지므로 preview image는 graphql 을 통해서 thumbnail을 만들어 사용한다.
 */
const ImageGallery = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: { relativePath: { regex: "/hackerton/" } }) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 320) {
                  src
                }
                original {
                  src
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const {
        allFile: { edges },
      } = data;
      const images = edges.map((edge) => {
        const {
          node: { childImageSharp },
        } = edge;
        const thumbnailSrc = childImageSharp.fluid.src;
        const originalSrc = childImageSharp.original.src;

        return {
          src: originalSrc,
          thumbnail: thumbnailSrc,
          thumbnailWidth: 320,
          thumbnailHeight: 200,
        };
      });

      return (
        <GalleryWrapper>
          <Gallery images={images} enableImageSelection={false} />
        </GalleryWrapper>
      );
    }}
  />
);

export default ImageGallery;
