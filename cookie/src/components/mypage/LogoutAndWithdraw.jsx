import styled from "styled-components";

const LogoutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 100%;
`;

const LogoutButton = styled.button`
  background-color: #f84b99;
  color: #fdf8fa;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 15px 30px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #c33677;
  }
`;

const WithdrawText = styled.p`
  margin-top: 80px;
  font-size: 0.9rem;
  color: #999;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`;

const LogoutAndWithdraw = ({ onLogout, onWithdraw }) => {
  return (
    <LogoutSection>
      <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
      <WithdrawText onClick={onWithdraw}>탈퇴하기</WithdrawText>
    </LogoutSection>
  );
};

export default LogoutAndWithdraw;
