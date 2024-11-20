import styled from "styled-components";
import Header from "../components/Header";
import Navbar from "../components/Navvar";
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
  const reviewData = [
    {
      poster: "https://via.placeholder.com/80", // 예시 이미지 URL
      movieTitle: "글래디에이터",
      comment: "미쳤다",
      cookies: 5, // 쿠키 점수
      profileImage: "https://via.placeholder.com/30",
      userName: "영화만보는사람",
      date: "오늘",
    },
    {
      poster: "https://via.placeholder.com/80",
      movieTitle: "인셉션",
      comment: "최고였다!",
      cookies: 4,
      profileImage: "https://via.placeholder.com/30",
      userName: "꿈속여행자",
      date: "어제",
    },
  ];
  const badgeData = [
    {
      label: "로맨스 매니아",
      image: "/src/assets/images/mypage/romancebadge.svg",
      bgColor: "#f8f8f8",
      textColor: "#CC5283",
    },
    {
      label: "액션 매니아",
      image: "/src/assets/images/mypage/actionbadge.svg",
      bgColor: "#f8f8f8",
      textColor: "#515151",
    },
    {
      label: "SF 매니아",
      image: "/src/assets/images/mypage/sfbadge.svg",
      bgColor: "#f8f8f8",
      textColor: "#6967E9",
    },
  ];

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
          name="금정씨"
          image="https://via.placeholder.com/100" // 일단 기본이미지 박음
          bgColor="#fff"
          titleColor="#ffffff"
          textColor="#000"
        />
      </div>
      <MypageContent>
        <BadgeList title="금정씨의 배지" badges={badgeData} />
        <GenreChart />
        <FavoriteList title="좋아요" items={favoriteItems} />
        <ReviewList title="금정씨의 리뷰(무한 스크롤)" reviews={reviewData} />
        <LogoutAndWithdraw
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
        />
      </MypageContent>
    </MypageContainer>
  );
};

export default MyPage;
