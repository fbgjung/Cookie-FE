import React, { useState } from "react";
import { DefalutContainer } from "./Likes";
import styled from "styled-components";
import axiosInstance from "../../api/auth/axiosInstance";
import Addcookie from "../../assets/images/admin/empty_cookie2.svg";

const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 20px;
`;
export const AddContainer = styled.div`
  margin: 20px auto;
  background-color: #f9f9f9;
  width: 1150px;
  height: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 5px 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: none;
  padding: 20px;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
  width: 500px;
`;

const Label = styled.label`
  width: 280px;

  font-size: 24px;
  height: 45px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 45px;
  font-size: 18px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
  height: 45px;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  cursor: pointer;
  color: #333;
  border: 1px solid #333;
  padding: 5px 10px;
  text-align: center;
  width: 100%;
  border-radius: 8px;
  background-color: #f7f7f7;
`;
const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 60px;
  font-size: 18px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  div {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 12px;
  }
`;
function AddBadge() {
  const [badgeName, setBadgeName] = useState("");
  const [grade, setGrade] = useState("");
  const [needPoint, setNeedPoint] = useState("");
  const [badgeImage, setBadgeImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBadgeImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const request = {
      badgeName: badgeName,
      needPoint: needPoint,
      grade: grade,
    };

    const formData = new FormData();

    if (badgeImage) {
      formData.append("badgeImage", badgeImage);
    }

    const requestBlob = new Blob([JSON.stringify(request)], {
      type: "application/json",
    });
    formData.append("request", requestBlob);

    try {
      const response = await axiosInstance.post("/api/admin/reward", formData);
      console.log("배지 등록 성공:", response.data.response);
      alert("뱃지가 등록되었어요!");
      setBadgeName("");
      setNeedPoint("");
      setBadgeImage(null);
      setImagePreview(null);
      setGrade("");
    } catch (error) {
      console.error("배지 등록 실패:", error);
    }
  };
  return (
    <>
      <DefalutContainer>
        <AddContainer>
          <FormContainer>
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Label>배지 이름:</Label>
                <Input
                  type="text"
                  value={badgeName}
                  onChange={(e) => setBadgeName(e.target.value)}
                  required
                />
              </Row>
              <Row>
                <Label>등급:</Label>
                <Select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                >
                  <option value="defalut">선택</option>
                  <option value="normal">Normal</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                </Select>
              </Row>
              <Row>
                <Label>필요 포인트:</Label>
                <Input
                  type="number"
                  value={needPoint}
                  onChange={(e) => setNeedPoint(e.target.value)}
                  required
                />
              </Row>
              <Row>
                <Label>배지 이미지:</Label>
                <FileInput
                  type="file"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="badgeImageUpload"
                />
                <ImgContainer>
                  <div>
                    {imagePreview && (
                      <ImagePreview src={imagePreview} alt="이미지 미리보기" />
                    )}
                  </div>

                  <UploadButton htmlFor="badgeImageUpload">
                    배지 이미지 등록
                  </UploadButton>
                </ImgContainer>
              </Row>
              <SubmitButton type="submit">등록하기</SubmitButton>
            </Form>
          </FormContainer>
        </AddContainer>
      </DefalutContainer>
    </>
  );
}

export default AddBadge;
