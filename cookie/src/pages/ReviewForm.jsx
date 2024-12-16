import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import ReviewHeader from "../components/searchpage/ReviewHeader";
import axiosInstance from "../api/auth/axiosInstance";
import useAuthStore from "../stores/useAuthStore";
import jwtDecode from "jwt-decode";

const FormWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: #ffffff;
  min-height: 100vh;
  overflow-y: auto;

  h1 {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem 0;

  span {
    color: #444444;
    font-size: 20px;
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
  height: 300px;
  min-height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 18px;
  box-sizing: border-box;
  margin-bottom: 20px;
  resize: none;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #FF0777;
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
    color: #FF0777;
    font-weight: 500;
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

  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  justify-content: center;

  &.submit {
    background-color: #F84B99;
    color: #fff;
    border: none;

    &:hover {
      background-color: #FF0777;
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
  const { openLoginModal } = useAuthStore();

  const movieTitle = state?.movieTitle || "영화 제목 없음";
  const movieId = state?.movieId;
  const posterUrl = state?.posterUrl;

  if (!movieId) {
    toast.error("유효하지 않은 영화 정보입니다.");
    navigate(-1);
    return null;
  }

  const getUserIdFromToken = () => {
    let token = sessionStorage.getItem("accessToken");

    if (!token) {
      token = localStorage.getItem("refreshToken");
    }

    if (!token) {
      openLoginModal(); 
      return null;
    }

    try {
      const payload = jwtDecode(token);
      return payload.id;
    } catch (error) {
      console.error("Invalid token:", error);
      toast.error("로그인 정보가 유효하지 않습니다.");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // 이미 요청 중이라면 함수 종료

    if (movieScore === 0) {
      toast.error("평점은 최소 1점 이상이어야 합니다!");
      return;
    }

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

    // console.log("서버로 보낼 데이터:", payload);

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
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <ReviewHeader movieTitle={movieTitle} onBack={() => navigate(-1)} />
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
        placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요"
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
      <ButtonWrapper className="submit" onClick={handleSubmit}>
          등록
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default ReviewForm;
