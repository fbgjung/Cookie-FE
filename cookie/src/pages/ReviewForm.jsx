import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import ReviewHeader from "../components/searchpage/ReviewHeader";
import axiosInstance from "../api/auth/axiosInstance";

const FormWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: black;
  min-height: 100vh;
  overflow-y: auto;

  h1 {
    color: white;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
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

  @media (max-width: 768px) {
    justify-content: center;
    margin: 15px 0;
    img {
      width: 150px;
    }
  }

  @media (max-width: 480px) {
    img {
      width: 120px;
    }
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

  @media (max-width: 768px) {
    span {
      font-size: 14px;
    }

    .rating-icons img {
      width: 20px;
      height: 20px;
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
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

  @media (max-width: 768px) {
    font-size: 16px;
    height: 150px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 120px;
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

  @media (max-width: 768px) {
    font-size: 13px;
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
      background-color: #00d6e8;
      color: #fff;
      border: none;

      &:hover {
        background-color: #00a8b5;
      }
    }
  }

  @media (max-width: 768px) {
    button {
      width: 45%;
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    button {
      width: 100%;
      margin-bottom: 10px;
      font-size: 14px;
    }

    .cancel {
      margin-bottom: 10px;
    }
  }
`;

const ReviewForm = () => {
  const [movieScore, setMovieScore] = useState(0);
  const [content, setContent] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (isSubmitting) return; // 이미 요청 중이라면 함수 종료
    setIsSubmitting(true); // 요청 시작

    const userId = getUserIdFromToken();
    if (!userId) {
      setIsSubmitting(false); // 요청 실패 시 플래그 초기화
      return;
    }

    const payload = {
      movieId,
      movieScore,
      content,
      isSpoiler,
    };

    console.log("서버로 보낼 데이터:", payload);

    try {
      const response = await axiosInstance.post(`/api/reviews`, payload);

      console.log("Axios 요청 정보:", response.config);

      if (response.status === 200) {
        toast.success("리뷰가 성공적으로 등록되었습니다.");
        console.log("리뷰 등록 성공:", response.data.response);
        navigate("/");
      } else {
        toast.error("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      if (
        error.response?.data.message === "해당 영화에 이미 리뷰를 등록했습니다."
      ) {
        toast.error("해당 영화에 이미 리뷰를 등록했습니다.");
      } else {
        toast.error("리뷰 등록 중 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false); // 요청 완료 후 플래그 초기화
    }
  };

  return (
    <FormWrapper>
      <ReviewHeader onBack={() => navigate(-1)} />
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
                    ? "/assets/images/review/cookiescore.svg"
                    : "/assets/images/review/cookieinactive.svg"
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
