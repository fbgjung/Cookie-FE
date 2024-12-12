import PropTypes from "prop-types";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: #333;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  .skeleton {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;

    .spinner {
      position: absolute;
      top: 45%;
      left: 45%;
      width: 40px;
      height: 40px;
      border: 4px solid #fff;
      border-top: 4px solid #00d6e8;
      border-radius: 50%;
      animation: ${spin} 1s linear infinite;
      transform: translate(-50%, -50%);
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: ${(props) => (props.isLoading ? "none" : "block")};
    z-index: 0;
  }

  .info-overlay {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    background: white;
    padding: 10px;
    border-radius: 8px;
    opacity: ${(props) => (props.isLoading ? 0 : 1)};
    transition: opacity 0.3s ease;

    h1 {
      font-size: 20px;
      font-weight: bold;
      color: black;
      margin: 0;
    }

    p {
      font-size: 14px;
      margin: 5px 0 0 0;
      color: black;
    }
  }

  @keyframes skeleton-loading {
    from {
      background-position: 0% 0%;
    }
    to {
      background-position: 200% 0%;
    }
  }
`;

const HeaderSection = ({
  title,
  releasedAt,
  country,
  runtime,
  certification,
  mainImage,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <HeaderWrapper isLoading={isLoading}>
      {isLoading && (
        <div className="skeleton">
          <div className="spinner" />
        </div>
      )}
      <img src={mainImage} alt="스틸컷" onLoad={handleImageLoad} />
      <div className="info-overlay">
        <h1>{title}</h1>
        <p>{`${releasedAt} · ${country} · ${runtime} · ${certification}`}</p>
      </div>
    </HeaderWrapper>
  );
};

HeaderSection.propTypes = {
  title: PropTypes.string.isRequired,
  releasedAt: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  runtime: PropTypes.string.isRequired,
  certification: PropTypes.string.isRequired,
  mainImage: PropTypes.string.isRequired,
};

export default HeaderSection;
