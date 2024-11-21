import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import ProfileImage from "../components/mypage/ProfileImage";
import BadgeList from "../components/mypage/BadgeList";
import GenreChart from "../components/mypage/GenreChart";
import FavoriteList from "../components/mypage/FavoriteList";
import ReviewList from "../components/mypage/ReviewList";
import LogoutAndWithdraw from "../components/mypage/LogoutAndWithdraw";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #04012d;
  position: relative;
`;

const MypageContent = styled.div`
  background-color: #ffffff;
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 180px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 80px;
`;

const MyPage = () => {
  const userId = 1;

  const [userData, setUserData] = useState({ nickname: "", profileImage: "" });
  const [badgeData, setBadgeData] = useState([]);
  const [genreScores, setGenreScores] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const { nickname, profileImage, badge, genreScores, reviews } =
          response.data.response;

        setUserData({ nickname, profileImage });
        setBadgeData(
          badge.map((b) => ({
            name: b.name,
            badgeImage: b.badgeImage,
          }))
        );

        const genreData = Object.entries(genreScores[0])
          .filter(([key]) => key !== "id" && key !== "userId")
          .map(([name, points]) => ({ name, points }));
        setGenreScores(genreData);

        const transformedReviews = reviews.map((review) => ({
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
        setReviewData(transformedReviews);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const favoriteItems = [{ label: "좋아한 영화" }, { label: "좋아한 리뷰" }];

  const handleLogout = () => {
    console.log("로그아웃");
  };

  const handleWithdraw = () => {
    console.log("탈퇴하기");
  };

  return (
    <MypageContainer>
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <ProfileImage
          title="로맨스 매니아"
          name={userData.nickname}
          image={userData.profileImage}
        />
      </div>
      <MypageContent>
        {/* 뱃지 리스트 */}
        <BadgeList title={`${userData.nickname}의 배지`} badges={badgeData} />

        {/* 장르 차트 */}
        <GenreChart data={genreScores} />

        {/* 좋아요 목록 */}
        <FavoriteList title="좋아요" items={favoriteItems} />

        {/* 리뷰 리스트 */}
        <ReviewList
          title={`${userData.nickname}의 리뷰`}
          reviews={reviewData}
        />

        {/* 로그아웃 및 탈퇴 */}
        <LogoutAndWithdraw
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
        />
      </MypageContent>
    </MypageContainer>
  );
};

export default MyPage;
