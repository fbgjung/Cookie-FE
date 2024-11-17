import PrivateRoute from "./PrivateRoute";
import Main from "../pages/main";

export const AppRouteDef = {
  Main: {
    path: "/main",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
  },
};
