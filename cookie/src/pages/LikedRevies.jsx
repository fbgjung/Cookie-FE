import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewList from "../components/mypage/ReviewList";

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
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

const EmptyMessage = styled.div`
  font-size: 1rem;
  color: #999;
  text-align: center;
  margin: 30px 0;
`;

const LikedReviews = () => {
  const navigate = useNavigate();
  const userId = 1;
  const [reviews, setReviews] = useState([]);

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchLikedReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/reviewLiked`
        );
        const reviewsData = response.data.response;

        const transformedReviews = reviewsData.map((review) => ({
          reviewId: review.reviewId,
          content: review.content,
          movieScore: review.movieScore,
          reviewLike: review.reviewLike,
          createdAt: review.createdAt,
          movie: {
            title: review.movie.title,
            poster: review.movie.poster,
          },
          user: {
            nickname: review.user.nickname,
            profileImage: review.user.profileImage,
          },
        }));

        setReviews(transformedReviews);
      } catch (error) {
        console.error("실패", error);
      }
    };

    fetchLikedReviews();
  }, [userId]);

  return (
    <Container>
      <BackButton
        src="/src/assets/images/mypage/ic_back.svg"
        alt="뒤로가기"
        onClick={handleBackClick}
      />
      <Title>좋아하는 리뷰</Title>
      <HeartIcon src="/src/assets/images/mypage/red-heart.svg" alt="하트" />
      {reviews.length > 0 ? (
        <ReviewList title="" reviews={reviews} />
      ) : (
        <EmptyMessage>좋아하는 리뷰를 선택해보세요!</EmptyMessage>
      )}
    </Container>
  );
};

export default LikedReviews;
