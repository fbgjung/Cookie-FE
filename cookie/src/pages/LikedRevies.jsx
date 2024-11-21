import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReviewList from "../components/mypage/ReviewList";

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 100%; /* 화면 전체 너비 */
  max-width: 1000px; /* 부모 컨테이너 최대 너비 */
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 15px;
    max-width: 95%;
  }
`;

const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 5%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 50px 0 10px;
  color: #04012d;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 40px 0 8px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 30px 0 5px;
  }
`;

const HeartIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-bottom: 15px;
  }
`;

const dummyReviews = [
  {
    poster: "/src/assets/images/movies/gladiator.jpg",
    movieTitle: "글래디에이터",
    profileImage: "/src/assets/images/mypage/user1.jpg",
    userName: "사용자1",
    date: "2024-11-18",
    comment: "정말 감동적인 영화였습니다.",
    cookies: 4,
  },
  {
    poster: "/src/assets/images/movies/wicked.jpg",
    movieTitle: "위키드",
    profileImage: "/src/assets/images/mypage/user2.jpg",
    userName: "사용자2",
    date: "2024-11-17",
    comment: "화려한 음악과 공연, 최고였습니다.",
    cookies: 5,
  },
  {
    poster: "/src/assets/images/movies/chungseol.jpg",
    movieTitle: "청설",
    profileImage: "/src/assets/images/mypage/user3.jpg",
    userName: "사용자3",
    date: "2024-11-16",
    comment: "잔잔한 스토리가 마음을 울렸어요.",
    cookies: 3,
  },
];

const LikedReviews = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackButton
        src="/src/assets/images/mypage/ic_back.svg"
        alt="뒤로가기"
        onClick={handleBackClick}
      />
      <Title>좋아하는 리뷰</Title>
      <HeartIcon src="/src/assets/images/mypage/red-heart.svg" alt="하트" />

      <ReviewList title="" reviews={dummyReviews} />
    </Container>
  );
};

export default LikedReviews;
