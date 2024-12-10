import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ReviewList from "../components/mypage/ReviewList";
import axiosInstance from "../api/auth/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #04012d;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const EmptyMessage = styled.div`
  font-size: 1rem;
  color: #666;
  margin-top: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 15px;
    left: 15px;
    width: 25px;
    height: 25px;
  }

  @media (max-width: 480px) {
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
  }
`;

const MyAllReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`, {
      state: { fromMyAllReviewList: true },
    });
  };

  const fetchReviews = async () => {
    if (loading || page >= totalPages) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/users/myReviews", {
        params: {
          page,
          size: 5,
        },
      });

      const { reviews: newReviews, totalPages: fetchedTotalPages } =
        response.data.response;

      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
      toast.error("리뷰 데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleObserver = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && page < totalPages - 1 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observerInstance = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });

    if (observer.current) observerInstance.observe(observer.current);

    return () => {
      if (observer.current) observerInstance.unobserve(observer.current);
    };
  }, [reviews]);

  useEffect(() => {
    if (page > 0) {
      fetchReviews();
    }
  }, [page]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackButton
        src="/assets/images/mypage/ic_back.svg"
        alt="뒤로가기"
        onClick={handleBackClick}
      />
      <Title>내가 쓴 리뷰</Title>
      {reviews.length === 0 ? (
        <EmptyMessage>내가 쓴 리뷰가 없습니다!</EmptyMessage>
      ) : (
        <>
          <ReviewList
            title=""
            reviews={reviews}
            onReviewClick={handleReviewClick}
          />
          <div ref={observer} style={{ height: "1px" }}></div>
        </>
      )}
    </Container>
  );
};

export default MyAllReviewList;
