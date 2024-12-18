import React, { useState } from "react";
import SideBar from "../../components/admin/SideBar";
import { TabBtn, TabBtnContainer, Viewport } from "./AdminMovie";
import Reviews from "../../components/admin/Reviews";
import Likes from "../../components/admin/Likes";

function AdminReviewLike() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <SideBar />
      <Viewport>
        <TabBtnContainer>
          <TabBtn onClick={() => setActiveTab(1)} $isActive={activeTab === 1}>
            리뷰 관리
          </TabBtn>
          <TabBtn onClick={() => setActiveTab(2)} $isActive={activeTab === 2}>
            좋아요 관리
          </TabBtn>
        </TabBtnContainer>
        {activeTab === 1 && <Reviews />}
        {activeTab === 2 && <Likes />}
      </Viewport>
    </>
  );
}

export default AdminReviewLike;
