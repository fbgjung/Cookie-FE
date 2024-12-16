import React, { useState } from "react";
import AddBadge from "../../components/admin/AddBadge";
import BadgeList from "./BadgeList";
import SideBar from "../../components/admin/SideBar";
import { TabBtn, TabBtnContainer, Viewport } from "./AdminMovie";
import Addcookie from "../../assets/images/admin/empty_cookie.svg";
import cookieList from "../../assets/images/admin/cookie.svg";

function AdminBadge() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <SideBar />
      <Viewport>
        <TabBtnContainer>
          <TabBtn onClick={() => setActiveTab(1)} $isActive={activeTab === 1}>
            <img src={Addcookie} />
            배지등록
          </TabBtn>
          <TabBtn onClick={() => setActiveTab(2)} $isActive={activeTab === 2}>
            <img src={cookieList} />
            배지관리
          </TabBtn>
        </TabBtnContainer>
        {activeTab === 1 && <AddBadge />}
        {activeTab === 2 && <BadgeList />}
      </Viewport>
    </>
  );
}

export default AdminBadge;
