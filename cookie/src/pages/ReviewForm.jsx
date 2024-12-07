import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";
import { toast } from "react-hot-toast";

// styled-components 정의
const FormWrapper = styled.div`
  width: 90%;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 16px;
  background-color: #ffffff;
  height: 100vh;
`;

const PosterWrapper = styled.div`
  display: flex;
  justify-content: left;
  margin: 20px 0;

  img {
    width: 200px;
    height: auto;
    border-radius: 8px;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }

  .rating-icons {
    display: flex;
    gap: 5px;

    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .inactive {
      filter: grayscale(100%);
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 450px;
  min-height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 18px;
  box-sizing: border-box;
  margin-bottom: 20px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SpoilerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
    cursor: pointer;
  }

  label {
    font-size: 14px;
    color: #d67a00;
  }

  .description {
    font-size: 12px;
    color: #666;
    margin-left: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 48%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &.cancel {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      color: #666;

      &:hover {
        background-color: #ddd;
      }
    }

    &.submit {
      background-color: #04012d;
      color: #fff;
      border: none;

      &:hover {
        background-color: #000;
      }
    }
  }
`;

// ReviewForm 컴포넌트
const ReviewForm = () => {
  const [movieScore, setMovieScore] = useState(0);
  const [content, setContent] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const movieTitle = state?.movieTitle || "영화 제목 없음";
  const movieId = state?.movieId;
  const posterUrl = state?.posterUrl;

  if (!movieId) {
    toast.error("유효하지 않은 영화 정보입니다.");
    navigate(-1);
    return null;
  }

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      toast.error("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (error) {
      console.error("Invalid token:", error);
      toast.error("로그인 정보가 유효하지 않습니다.");
      return null;
    }
  };

  const handleSubmit = async () => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    const payload = {
      movieId,
      movieScore,
      content,
      isSpoiler,
    };

    try {
      const response = await axiosInstance.post(`/api/reviews`, payload);
      if (response.status === 200) {
        toast.success("리뷰가 성공적으로 등록되었습니다.");
        navigate("/reviews");
      } else {
        toast.error("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      toast.error("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <FormWrapper>
      <h1>{movieTitle} 리뷰 남기기</h1>
      {posterUrl && (
        <PosterWrapper>
          <img src={posterUrl} alt={`${movieTitle} 포스터`} />
        </PosterWrapper>
      )}
      <RatingWrapper>
        <span>평점</span>
        <div className="rating-icons">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <img
                key={index}
                src={
                  index < movieScore
                    ? "images/cookiescore.svg"
                    : "images/cookieinactive.svg"
                }
                alt="Cookie"
                className={index >= movieScore ? "inactive" : ""}
                onClick={() => setMovieScore(index + 1)}
              />
            ))}
        </div>
      </RatingWrapper>
      <TextArea
        placeholder="리뷰를 작성해주세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <SpoilerWrapper>
        <input
          type="checkbox"
          id="spoiler"
          checked={isSpoiler}
          onChange={(e) => setIsSpoiler(e.target.checked)}
        />
        <label htmlFor="spoiler">스포일러가 포함된 리뷰</label>
        <span className="description">
          스포일러가 포함된 리뷰는 따로 표시됩니다.
        </span>
      </SpoilerWrapper>
      <ButtonWrapper>
        <button className="cancel" onClick={() => navigate(-1)}>
          취소
        </button>
        <button className="submit" onClick={handleSubmit}>
          등록
        </button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default ReviewForm;