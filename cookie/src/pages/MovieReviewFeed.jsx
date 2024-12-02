import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import axiosInstance from "../api/auth/axiosInstance";

const PageWrapper = styled.div`
    width: 90%;
  padding: 20px;
  margin: 0 auto;
  height: 100vh;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  button {
    padding: 10px 20px;
    border: none;
    background-color: #555;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #000;
    }

    &.active {
      background-color: #04012d;
    }
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  filter: ${(props) => (props.spoiler ? "blur(5px)" : "none")};

  .review-info {
    flex: 1;
    margin-left: 15px;

    .username {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .content {
      font-size: 14px;
      color: #666;
    }

    .likes {
      font-size: 14px;
      color: #cc5283;
      margin-top: 10px;
    }
  }
`;

const MovieReviewFeed = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/{movies}/${movieId}/reviews`
        );
        setReviews(response.data);
        setFilteredReviews(response.data);
      } catch (error) {
        console.error("리뷰 불러오기 실패:", error);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleTabClick = (tab) => {
    setTab(tab);
    if (tab === "all") {
      setFilteredReviews(reviews);
    } else if (tab === "spoiler") {
      setFilteredReviews(reviews.filter((review) => review.containsSpoiler));
    }
  };

  return (
    <PageWrapper>
      <h2>영화 리뷰</h2>
      <TabContainer>
        <button
          className={tab === "all" ? "active" : ""}
          onClick={() => handleTabClick("all")}
        >
          전체 리뷰
        </button>
        <button
          className={tab === "spoiler" ? "active" : ""}
          onClick={() => handleTabClick("spoiler")}
        >
          스포일러 리뷰
        </button>
      </TabContainer>
      <ReviewContainer>
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} spoiler={review.containsSpoiler && tab === "all"}>
            <img
              src={review.user.profileImage || "/assets/images/default-user.png"}
              alt={review.user.nickname}
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            />
            <div className="review-info">
              <div className="username">{review.user.nickname}</div>
              <div className="content">{review.content}</div>
              <div className="likes">❤️ {review.reviewLike}</div>
            </div>
          </ReviewCard>
        ))}
      </ReviewContainer>
    </PageWrapper>
  );
};

export default MovieReviewFeed;