import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h2`
  margin-top: 50px;
`

const VideoWrapper = styled.div`
  margin-top: 30px;

  h2 {
    margin-bottom: 10px;
  }

  .video-grid {
    display: flex;
    gap: 15px;

    .video-item {
      flex: 1;
      position: relative;
      cursor: pointer;

      img {
        width: 100%;
        border-radius: 8px;
        object-fit: cover;
      }

      .video-title {
        text-align: center;
        margin-top: 8px;
        font-size: 14px;
        color: #333;
      }
    }
  }
`;

const VideoSection = ({ videoUrl }) => {
  if (!videoUrl) return null;

  const videoId = videoUrl.includes("v=") ? videoUrl.split("v=")[1] : null;

  return (
    <VideoWrapper>
      <Title>동영상</Title>

      <div className="video-grid">
        <div className="video-item" onClick={() => window.open(videoUrl, "_blank")}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt="Video Thumbnail"
          />
        </div>
      </div>
    </VideoWrapper>
  );
};

// PropTypes로 유효성 검사 추가
VideoSection.propTypes = {
  videoUrl: PropTypes.string.isRequired, // YouTube URL
};

export default VideoSection;

