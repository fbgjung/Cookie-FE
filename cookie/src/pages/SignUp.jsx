import React, { useRef, useState } from "react";
import GlobalStyle, { Content } from "../styles/global";
import styled from "styled-components";
import userDefaultImg from "../assets/images/signUp/user_img.svg";
import deleteBtn from "../assets/images/signUp/close_icon.svg";
const MainContainer = styled.div`
  /* background-color: var(--ticket-bg); */
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
const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;

  .user__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  .user__profile--image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    &:hover {
      border: 1px solid var(--main);
    }
  }

  .user__profile--deleteBtn {
    background-color: transparent;
    width: 24px;
    height: 24px;
    border: none;
    padding: 0;
    outline: none;
    position: absolute;
    top: 200px;
    right: 250px;
  }

  p {
    margin: 2rem 0 0.5rem 0;
    color: var(--main);
  }

  .user__nickName {
    margin-top: 50px;
  }

  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 1rem;
    color: var(--main);
  }

  input {
    display: block;
    width: 28rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0 70px 200px rgba(3, 6, 59, 0.5);
    font-size: 1.2rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: white;
    color: var(--main);
  }
  input:focus {
    outline: 1px solid var(--main);
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15rem;

  button {
    background-color: var(--main);
    color: white;
    width: 29rem;
    height: 4rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0 10px 100px rgba(3, 6, 59, 0.5);
    font-size: 1.2rem;
    outline: none;
  }
`;

function SignUp() {
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [userNickname, setUserNickname] = useState("");

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUserImageUrl(fileUrl);
    }
  };
  const handleImageDelete = () => {
    setUserImageUrl(null);
    fileInputRef.current.value = "";
  };

  const handleNicknameChange = (e) => {
    setUserNickname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("이미지 URL:", userImageUrl);
    console.log("닉네임:", userNickname);
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <MainTitle>
          <h2>회원 정보를</h2>
          <h2>입력해주세요</h2>
        </MainTitle>
        <form onSubmit={handleSubmit}>
          <UserInfo>
            <div className="user__profile">
              <img
                className="user__profile--image"
                src={userImageUrl || userDefaultImg}
                alt="user_img"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {userImageUrl && (
                <button
                  type="button"
                  className="user__profile--deleteBtn"
                  onClick={handleImageDelete}
                >
                  <img src={deleteBtn} alt="delete_button" />
                </button>
              )}
            </div>
            <p>프로필사진을 등록해주세요</p>
            <div className="user__nickName">
              <label>
                닉네임
                <input
                  type="text"
                  placeholder="ex) 쿠키"
                  value={userNickname || ""}
                  onChange={handleNicknameChange}
                  required
                />
              </label>
            </div>
          </UserInfo>
          <SubmitBtn>
            <button type="submit">다음</button>
          </SubmitBtn>
        </form>
      </MainContainer>
    </>
  );
}

export default SignUp;
