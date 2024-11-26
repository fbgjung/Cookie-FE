import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../styles/global";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";
import toast from "react-hot-toast";
import useNotificationStore from "../stores/notificationStore";

const MainContainer = styled.div`
  background-color: white;
  height: 100vh;
  padding: 4.375rem 0 0 0;
`;
const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 2.5rem;
  line-height: 0.5rem;

  h2 {
    margin: 0.8rem;
    color: var(--main);
  }
`;

const SubTitle = styled.div`
  margin: 2.5rem 3.3rem;

  h3 {
    color: var(--main);
    margin: 0;
  }

  p {
    color: var(--main);
    margin: 0;
    font-size: 0.9rem;
  }
`;

const ThemeContainer = styled.div`
  margin: 2.5rem 3.3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  width: 70%;
`;

const ThemeBtn = styled.button`
  background-color: ${(props) =>
    props.$isSelected ? "var(--main)" : "var(--sub-btn)"};
  color: ${(props) => (props.$isSelected ? "white" : "var(--main)")};
  border-radius: 5rem;
  padding: 0.8rem 1rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--main);
    color: white;
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20.6rem;

  button {
    background-color: var(--main);
    color: white;
    width: 29rem;
    height: 4rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0 0.625rem 6.25rem rgba(3, 6, 59, 0.5);
    font-size: 1.2rem;
    outline: none;
    cursor: pointer;
  }
`;
// TODO 알림 or 이메일 수신 여부 및 알림동의 모달

function SignUpGenre() {
  const MovieGenre = [
    {
      id: 1,
      genre: "로맨스",
    },
    {
      id: 2,
      genre: "공포",
    },
    {
      id: 3,
      genre: "코미디",
    },
    {
      id: 4,
      genre: "액션",
    },
    {
      id: 5,
      genre: "판타지",
    },
    {
      id: 6,
      genre: "애니메이션",
    },
    {
      id: 7,
      genre: "범죄",
    },
    {
      id: 8,
      genre: "SF",
    },
    {
      id: 9,
      genre: "음악",
    },
    {
      id: 10,
      genre: "스릴러",
    },
    {
      id: 11,
      genre: "전쟁",
    },
    {
      id: 12,
      genre: "다큐멘터리",
    },
    {
      id: 13,
      genre: "드라마",
    },
    {
      id: 14,
      genre: "가족",
    },
    {
      id: 15,
      genre: "역사",
    },
    {
      id: 16,
      genre: "미스터리",
    },
    {
      id: 17,
      genre: "TV영화",
    },
    {
      id: 18,
      genre: "서부극",
    },
    {
      id: 19,
      genre: "모험",
    },
  ];
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userProfileData = location.state;

  const handleButtonClick = (id) => {
    setSelectedGenreId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedGenreId) {
      alert("장르를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("socialProvider", userProfileData.socialProvider);
    formData.append("socialId", userProfileData.socialId);
    formData.append("email", userProfileData.email);
    formData.append("nickname", userProfileData.nickname);
    formData.append("pushEnabled", "false");
    formData.append("emailEnabled", "false");
    formData.append("genreId", selectedGenreId.toString());
    formData.append("profileImage", userProfileData.profileImage);

    try {
      const response = await axiosInstance.post(
        `/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("회원등록이 완료되었어요!");

        const tokenResponse = await axiosInstance.get(
          `/api/auth/retrieve-token`,
          { withCredentials: true }
        );

        const { accessToken, refreshToken } = tokenResponse.data.response;

        if (accessToken && refreshToken) {
          sessionStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          console.log("AccessToken: ", accessToken);
          console.log("RefreshToken: ", refreshToken);

          const eventSource = new EventSource(
            `http://localhost:8080/api/reviews/subscribe/push-notification`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const addNotification =
            useNotificationStore.getState().addNotification;

          eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            addNotification(data);
          };

          eventSource.onerror = (error) => {
            console.error("SSE 연결 에러:", error);
            eventSource.close();
          };

          navigate("/");
        } else {
          throw new Error("토큰 발급에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
      toast.error(`가입 실패: ${error.message}`);
    }
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <MainTitle>
          <h2>선호하는 장르를</h2>
          <h2>알려주세요</h2>
        </MainTitle>
        <SubTitle>
          <h3>어떤 장르를 좋아하나요?👀</h3>
          <p>좋아하는 장르 1개를 골라주세요</p>
        </SubTitle>
        <ThemeContainer>
          {MovieGenre.map((item) => (
            <ThemeBtn
              key={item.id}
              $isSelected={selectedGenreId === item.id}
              onClick={() => handleButtonClick(item.id)}
            >
              {item.genre}
            </ThemeBtn>
          ))}
        </ThemeContainer>
        <SubmitBtn>
          <button type="button" onClick={handleSubmit}>
            완료
          </button>
        </SubmitBtn>
      </MainContainer>
    </>
  );
}

export default SignUpGenre;
