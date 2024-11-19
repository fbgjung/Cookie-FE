import styled from "styled-components";

const LogoutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const LogoutButton = styled.button`
  background-color: #04012d;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 15px 30px;
  cursor: pointer;
  width: 90%;
  max-width: 300px;

  &:hover {
    background-color: #333;
  }
`;

const WithdrawText = styled.p`
  margin-top: 10px;
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
