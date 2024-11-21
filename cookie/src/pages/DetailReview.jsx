import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailHeader from "../components/mypage/DetailHeader";
import ReviewContentSection from "../components/mypage/ReviewContentSection";
import ReviewTextSection from "../components/mypage/ReviewTextSection";
import FooterSection from "../components/mypage/FooterSection";

const Container = styled.div`
  padding: 20px;
  max-width: 768px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ReviewText = styled.div`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;

  p {
    margin-bottom: 10px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9rem;
  color: #666;

  margin-top: auto;

  .likes-comments {
    display: flex;
    align-items: center;

    .icon {
      font-size: 1rem;
      margin-right: 5px;
      color: #666;
    }

    .count {
      margin-right: 15px;
    }
  }
`;

const DetailReview = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    alert("수정하기를 선택했습니다.");
    setMenuOpen(false);
  };

  const handleDelete = () => {
    alert("삭제하기를 선택했습니다.");
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".options") &&
        !event.target.closest(".dropdown-menu")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      {/* Header */}
      <DetailHeader onBack={handleBack} />

      <ReviewContentSection
        posterSrc="/src/assets/images/movies/gladiator.jpg"
        profileSrc="/src/assets/images/mypage/user1.jpg"
        name="영화만보는사람"
        date="오늘"
        movieTitle="글래디에이터"
        movieYearCountry="2021 | 미국"
        cookieScoreCount={4}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <ReviewTextSection
        reviewText={`억지 글래디에이터 감성 주입에 잔인한 액션 추가 영화 "글래디에이터 2"는 전쟁영화의 거장으로 불리는 리들리 스콧 감독의 역작으로, 그의 작품세계...`}
      />

      <FooterSection likes={78} comments={2} />
    </Container>
  );
};

export default DetailReview;
