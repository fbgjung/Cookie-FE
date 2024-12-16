import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/auth/axiosInstance";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: var(--ticket-bg);
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  font-size: 20px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 20px;
`;

const FileInput = styled.input``;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: start;
  div {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 12px;
  }
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const UploadButton = styled.label`
  padding: 5px 12px;
  color: var(--text);
  border: 1px solid var(--sub);
  border-radius: 12px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  padding: 8px 12px;
  background-color: var(--sub);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
`;

const CancelButton = styled.button`
  padding: 8px 12px;
  background-color: #ccc;
  color: #000000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 58px;
  margin-top: 20px;
`;

function EditBadgeModal({ badge, onClose, fetchBadgeList }) {
  const [badgeName, setBadgeName] = useState(badge?.badgeName || "");
  const [grade, setGrade] = useState(badge?.grade || "default");
  const [needPoint, setNeedPoint] = useState(badge?.needPoint || "");
  const [badgeImage, setBadgeImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(badge?.badgeImage || null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBadgeImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const update = {
      badgeName: badgeName,
      needPoint: needPoint,
      grade: grade,
    };

    const formData = new FormData();

    if (badgeImage) {
      formData.append("badgeImage", badgeImage);
    }

    const updateBlob = new Blob([JSON.stringify(update)], {
      type: "application/json",
    });
    formData.append("update", updateBlob);

    try {
      const response = await axiosInstance.put(
        `/api/admin/reward/${badge.badgeId}`,
        formData
      );

      console.log("배지 수정 성공:", response.data);
      alert("뱃지가 수정되었어요!");
      fetchBadgeList();
      onClose();
    } catch (error) {
      console.error("배지 수정 실패:", error);

      if (error.response && error.response.data) {
        alert(error.response.data);
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>배지 수정</h2>

        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Label>배지 이름</Label>
            <Input
              type="text"
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              required
            />
          </Row>
          <Row>
            <Label>등급</Label>
            <Select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              <option value="default">선택</option>
              <option value="normal">Normal</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
            </Select>
          </Row>
          <Row>
            <Label>필요 포인트</Label>
            <Input
              type="number"
              value={needPoint}
              onChange={(e) => setNeedPoint(e.target.value)}
              required
            />
          </Row>
          <Row>
            <Label>배지 이미지</Label>
            <FileInput
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="badgeImageUpload"
            />
            <ImgContainer>
              {imagePreview && imagePreview !== null && (
                <div>
                  <ImagePreview src={imagePreview} alt="이미지 미리보기" />
                </div>
              )}
              <UploadButton htmlFor="badgeImageUpload">
                이미지 수정
              </UploadButton>
            </ImgContainer>
          </Row>
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              취소
            </CancelButton>
            <SubmitButton type="submit">저장하기</SubmitButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EditBadgeModal;
