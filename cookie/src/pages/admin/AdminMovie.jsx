import styled from "styled-components";
import SideBar from "../../components/admin/SideBar";
import { useState } from "react";
import Addmovie from "../../components/admin/Addmovie";
import CookieMovieList from "../../components/admin/CookieMovieList";

export const Viewport = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 440px;
`;

export const TabBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2rem 0 -0.8rem 0;
`;
export const TabBtn = styled.button`
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 8px;
  width: 165px;
  height: 75px;
  font-size: 20px;
  font-weight: 700;
  margin-right: 0.3rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? "#Ffffff" : "#000000")};
  color: ${({ $isActive }) => ($isActive ? "#000000" : "#ffffff")};

  img {
    width: 29px;
    height: 29px;
  }
`;

function AdminMovie() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <SideBar />
      <Viewport>
        <TabBtnContainer>
          <TabBtn onClick={() => setActiveTab(1)} $isActive={activeTab === 1}>
            영화 등록
          </TabBtn>
          <TabBtn onClick={() => setActiveTab(2)} $isActive={activeTab === 2}>
            쿠키 영화
          </TabBtn>
        </TabBtnContainer>
        {activeTab === 1 && <Addmovie />}
        {activeTab === 2 && <CookieMovieList />}
      </Viewport>
    </>
  );
}

export default AdminMovie;
