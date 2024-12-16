import React, { useState } from "react";
import SideBar from "../../components/admin/SideBar";
import { TabBtn, TabBtnContainer, Viewport } from "./AdminMovie";
import AddMatchUp from "../../components/admin/AddMatchUp";
import MatchUpList from "../../components/admin/MatchUpList";
import addMatchup from "../../assets/images/admin/award.svg";
import matchupList from "../../assets/images/admin/award2.svg";

function AdminMatchUp() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <SideBar />
      <Viewport>
        <TabBtnContainer>
          <TabBtn onClick={() => setActiveTab(1)} $isActive={activeTab === 1}>
            <img src={addMatchup} />
            매치업등록
          </TabBtn>
          <TabBtn onClick={() => setActiveTab(2)} $isActive={activeTab === 2}>
            <img src={matchupList} />
            매치업관리
          </TabBtn>
        </TabBtnContainer>
        {activeTab === 1 && <AddMatchUp />}
        {activeTab === 2 && <MatchUpList />}
      </Viewport>
    </>
  );
}

export default AdminMatchUp;
