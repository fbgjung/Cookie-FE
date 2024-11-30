import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";

import ReviewList from "../components/mypage/ReviewList";
import axiosInstance from "../api/auth/axiosInstance";

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
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchLikedReviews = async () => {
    if (loading || page > totalPages) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/users/likedReviewList/", {
        params: {
          page: page - 1,
          size: 10,
        },
      });

      const { movies, totalPages } = response.data.response;

      const newReviews = movies.map((movie) => ({
        title: movie.title,
        poster: movie.poster,
        releasedAt: movie.releasedAt,
        country: movie.country,
        reviews: movie.reviews,
      }));

      setReviews((prev) => [...prev, ...newReviews]);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  const lastReviewRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  useEffect(() => {
    fetchLikedReviews();
  }, [page]);

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
        <ReviewList title="" reviews={reviews} lastReviewRef={lastReviewRef} />
      ) : (
        <EmptyMessage>좋아하는 리뷰를 선택해보세요!</EmptyMessage>
      )}
    </Container>
  );
};

export default LikedReviews;
