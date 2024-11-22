import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderSection from "../components/movieDetailPage/HeaderSection";
import DetailsSection from "../components/movieDetailPage/DetailsSection";
import CastSection from "../components/movieDetailPage/CastSection";
import VideoSection from "../components/movieDetailPage/VideoSection";
import GallerySection from "../components/movieDetailPage/GallerySection";
import ReviewSection from "../components/movieDetailPage/ReviewSection";

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const MovieDetail = () => {
  const { id } = useParams();

  // 샘플 데이터 (API 연동 시 대체)
  const movie = {
    title: "소년시절의 너",
    year: "2019",
    country: "중국, 홍콩",
    duration: "2시간 15분",
    rating: "15세",
    description:
      "시험만 잘 치면 멋진 인생을 살 수 있다고 가르치는 세상에서 기댈 곳 없이 세상에 내몰린 우등생 소녀...",
    posterUrl: "https://via.placeholder.com/120x160?text=포스터",
    stillCuts: [
      "https://via.placeholder.com/600x300?text=스틸컷+1",
      "https://via.placeholder.com/600x300?text=스틸컷+2",
      "https://via.placeholder.com/600x300?text=스틸컷+3"
    ],
    cast: [
      { name: "중국상", role: "감독", img: "https://via.placeholder.com/70" },
      { name: "장동건", role: "주연", img: "https://via.placeholder.com/70" },
      { name: "장동건", role: "주연", img: "https://via.placeholder.com/70" },
      { name: "장동건", role: "주연", img: "https://via.placeholder.com/70" },
      { name: "장동건", role: "주연", img: "https://via.placeholder.com/70" },
      { name: "장동건", role: "주연", img: "https://via.placeholder.com/70" },
    ],
    videos: [
      {
        thumbnail: "https://via.placeholder.com/200x120?text=메인+예고편",
        title: "메인 예고편",
      },
      {
        thumbnail: "https://via.placeholder.com/200x120?text=30초+예고편",
        title: "30초 예고편",
      },
      {
        thumbnail: "https://via.placeholder.com/200x120?text=메이킹+영상",
        title: "메이킹 영상",
      }
    ],
    gallery: [
      "https://via.placeholder.com/200x120?text=갤러리+1",
      "https://via.placeholder.com/200x120?text=갤러리+2",
      "https://via.placeholder.com/200x120?text=갤러리+3"
    ],
  };

  const reviews = [
    {
      userName: "금정씨",
      comment: "인생에 가정법은 없어 그리고 또 하나 우리 이야기에 가정법은 촬영",
      likes: 78,
    },
    {
      userName: "금정씨",
      comment: "아름다운 영상미와 감동적인 이야기.",
      likes: 102,
    },
    {
      userName: "금정씨",
      comment: "연기와 스토리가 모두 완벽했던 영화!",
      likes: 45,
    },
    {
      userName: "금정씨",
      comment: "영화가 끝난 뒤에도 여운이 남습니다.",
      likes: 60,
    },
  ];

  return (
    <ContentWrapper>
      <HeaderSection
        title={movie.title}
        year={movie.year}
        country={movie.country}
        duration={movie.duration}
        rating={movie.rating}
        stillCuts={movie.stillCuts}
      />
      <DetailsSection
        posterUrl={movie.posterUrl}
        keywords={["로맨스", "범죄", "실화를 소재로 한"]}
        description={movie.description}
      />
      <CastSection cast={movie.cast} />
      <VideoSection videos={movie.videos} />
      <GallerySection images={movie.gallery} />
      <ReviewSection reviews={reviews} reviewCount={36} />
    </ContentWrapper>
  );
};

export default MovieDetail;