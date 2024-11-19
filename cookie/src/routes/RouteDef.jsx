import PrivateRoute from "./PrivateRoute";
import Main from "../pages/main";
import MyPage from "../pages/mypage";

export const AppRouteDef = {
  Main: {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
  },

  MyPage: {
    path: "/mypage",
    element: (
      <PrivateRoute>
        <MyPage />
      </PrivateRoute>
    ),
  },
};
