import styled from "styled-components";
import PropTypes from "prop-types"; // PropTypes를 import

const GalleryWrapper = styled.div`
  margin-top: 30px;

  h2 {
    margin-bottom: 10px;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;

    img {
      width: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }
`;

const GallerySection = ({ images }) => {
  return (
    <GalleryWrapper>
      <h2>갤러리</h2>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`갤러리 이미지 ${index + 1}`} />
        ))}
      </div>
    </GalleryWrapper>
  );
};

// PropTypes로 유효성 검사 추가
GallerySection.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired, // 이미지 배열 (필수)
};

export default GallerySection;