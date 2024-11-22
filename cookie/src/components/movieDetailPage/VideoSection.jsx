import styled from "styled-components";
import PropTypes from "prop-types"; // PropTypes를 추가로 import

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

const VideoSection = ({ videos }) => {
  return (
    <VideoWrapper>
      <h2>동영상(우측 슬라이드)</h2>
      <div className="video-grid">
        {videos.map((video, index) => (
          <div className="video-item" key={index}>
            <img src={video.thumbnail} alt={video.title} />
            <div className="video-title">{video.title}</div>
          </div>
        ))}
      </div>
    </VideoWrapper>
  );
};

// PropTypes로 유효성 검사 추가
VideoSection.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired, // 썸네일 URL
      title: PropTypes.string.isRequired, // 비디오 제목
    })
  ).isRequired,
};

export default VideoSection;