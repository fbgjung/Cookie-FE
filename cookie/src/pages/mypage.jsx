import { useEffect, useState } from "react";
import styled from "styled-components";

import ProfileImage from "../components/mypage/ProfileImage";
import BadgeList from "../components/mypage/BadgeList";
import GenreChart from "../components/mypage/GenreChart";
import FavoriteList from "../components/mypage/FavoriteList";
import ReviewList from "../components/mypage/ReviewList";
import LogoutAndWithdraw from "../components/mypage/LogoutAndWithdraw";
import axiosInstance from "../api/auth/axiosInstance";
import { toast } from "react-hot-toast";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff4b9;
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
  const [userData, setUserData] = useState({ nickname: "", profileImage: "" });
  const [badgeData, setBadgeData] = useState([]);
  const [genreScores, setGenreScores] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("fetch");
        const response = await axiosInstance.get("/api/users");

        console.log("api response", response.data.response);

        const { nickname, profileImage, badge, genreScores, reviews } =
          response.data.response;

        console.log("닉네임 프로필이미지", {
          nickname,
          profileImage,
        });

        setUserData({ nickname, profileImage });

        console.log("뱃지데이터", badge);
        setBadgeData(
          badge.map((b) => ({
            name: b.name,
            badgeImage: b.badgeImage,
            main: b.main,
          }))
        );

        console.log("장르데이터", genreScores);
        const genreData = Object.entries(genreScores[0])
          .filter(([key]) => key !== "id" && key !== "userId")
          .map(([name, points]) => ({ name, points }));
        console.log("Transformed genre scores:", genreData);
        setGenreScores(genreData);

        console.log("리뷰데이터", reviews);
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
        console.log("ㅎㅎ", transformedReviews);
        setReviewData(transformedReviews);
      } catch (error) {
        console.error("fail111", error);
      }
    };

    fetchUserData();
  }, []);

  const mainBadge = badgeData.find((badge) => badge.main) || {};
  const favoriteItems = [{ label: "좋아한 영화" }, { label: "좋아한 리뷰" }];

  const handleLogout = () => {
    console.log("Logging out...");
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleWithdraw = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await axiosInstance.delete("/api/users");
        toast.success("탈퇴가 완료되었습니다.");
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/login";
      } catch (error) {
        console.error("탈퇴 요청 실패:", error);
        toast.error("탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
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
          title={mainBadge.name || "배지 없음"}
          name={userData.nickname}
          image={userData.profileImage}
          badgeIcon={
            mainBadge.badgeImage || "/src/assets/images/defaultBadge.png"
          }
        />
      </div>
      <MypageContent>
        <BadgeList title={`${userData.nickname}의 배지`} badges={badgeData} />
        <GenreChart data={genreScores} />
        <FavoriteList title="좋아요" items={favoriteItems} />
        <ReviewList
          title={`${userData.nickname}의 리뷰`}
          reviews={reviewData}
        />
        <LogoutAndWithdraw
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
        />
      </MypageContent>
    </MypageContainer>
  );
};

export default MyPage;
