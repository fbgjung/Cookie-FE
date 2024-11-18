import PrivateRoute from "./PrivateRoute";
import Main from "../pages/main";
import Search from "../pages/search";
import MovieDetail from "../pages/MovieDetail";

export const AppRouteDef = {
  Main: {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
  },
  Search: {
    path: "/search",
    element: (
      <PrivateRoute>
        <Search />
      </PrivateRoute>
    ),
  },
  MovieDetail: {
    path: "/movie/:id", // 동적 라우팅
    element: (
      <PrivateRoute>
        <MovieDetail />
      </PrivateRoute>
    ),
  },
};
