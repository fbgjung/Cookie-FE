import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderSection from "../components/movieDetailPage/HeaderSection";
import DetailsSection from "../components/movieDetailPage/DetailsSection";
import CastSection from "../components/movieDetailPage/CastSection";
import VideoSection from "../components/movieDetailPage/VideoSection";
import GallerySection from "../components/movieDetailPage/GallerySection";
import ReviewSection from "../components/movieDetailPage/ReviewSection";
import image from "../assets/images/ghpark.jpg";
import test from "../assets/images/test.png";

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
      "시험만 잘 치면 멋진 인생을 살 수 있다고 가르치는 세상에서 기댈 곳 없이 세상에 내몰린 우등생 소녀 ‘첸니엔’과 양아치 소년 ‘베이’. 비슷한 상처와 외로움에 끌려 서로에게 의지하게 된 두 사람은 수능을 하루 앞둔 어느 날, ‘첸니엔’의 삶을 뒤바꿔버릴 거대한 사건에 휘말리게 된다. ‘첸니엔’만은 평범하고 행복하게 살길 바라는 ‘베이’는 그녀의 그림자가 되어 모든 것을 해결하기로 마음 먹는데…",
    posterUrl: image,
    stillCuts: [
      test,
      "https://via.placeholder.com/600x300?text=스틸컷+2",
      "https://via.placeholder.com/600x300?text=스틸컷+3"
    ],
    cast: [
      { name: "박건휘", role: "감독", img: image },
      { name: "박건휘", role: "주연", img: image },
      { name: "박건휘", role: "주연", img: image },
      { name: "박건휘", role: "주연", img: image },
      { name: "박건휘", role: "주연", img: image },
      { name: "박건휘", role: "주연", img: image }
    ],
    videos: [
      {
        thumbnail: test,
        title: "메인 예고편",
      },
      {
        thumbnail: test,
        title: "30초 예고편",
      },
      {
        thumbnail: test,
        title: "메이킹 영상",
      }
    ],
    gallery: [
      test,
      test,
      test
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