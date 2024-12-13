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
  background-color: white;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  min-height: 80vh;
`;

const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 5%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 50px 0 10px;
  color: black;
  text-align: center;
`;

const HeartIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 30px;
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
      const response = await axiosInstance.get("/api/users/likedReviewList", {
        params: {
          page: page - 1,
          size: 10,
        },
      });

      const { reviews = [], totalPages = 1 } = response.data.response || {};

      const newReviews = reviews.map((review) => ({
        reviewId: review.reviewId,
        content: review.content,
        movieScore: review.movieScore, // 영화 평점 추가
        reviewLike: review.reviewLike, // 좋아요 수 추가
        createdAt: new Date(review.createdAt).toLocaleDateString(),
        updatedAt: new Date(review.updatedAt).toLocaleDateString(),
        movie: {
          title: review.movie.title,
          poster:
            review.movie.poster || "/src/assets/images/default-poster.jpg",
        },
        user: {
          nickname: review.user.nickname,
          profileImage: review.user.profileImage,
          mainBadgeImage: review.user.mainBadgeImage,
        },
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

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`, {
      state: { fromLikedReviews: true },
    });
  };

  return (
    <Container>
      <BackButton
        src="/assets/images/mypage/ic_back.svg"
        alt="Back"
        onClick={handleBackClick}
      />
      <Title>좋아하는 리뷰</Title>
      <HeartIcon src="/assets/images/mypage/red-heart.svg" alt="하트" />
      {reviews.length > 0 ? (
        <ReviewList
          title=""
          reviews={reviews}
          lastReviewRef={lastReviewRef}
          onReviewClick={handleReviewClick}
        />
      ) : (
        <EmptyMessage>좋아하는 리뷰를 선택해보세요!</EmptyMessage>
      )}
    </Container>
  );
};

export default LikedReviews;
