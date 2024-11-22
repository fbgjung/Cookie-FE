import React from "react";
import styled from "styled-components";
import cookieMovie from "../../assets/images/main/cookie_icon.svg";

const CookieMovieList = styled.div`
  position: relative;

  .cookieMovie__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .cookieMovie__title span {
    color: var(--cookie);
  }

  .cookie__movie {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow-x: scroll;
    gap: 1rem;
  }
  .cookie__movie--list {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 0.5rem;
  }
  .cookie__movie--list img {
    border-radius: 0.75rem;
  }
  .cookie__movie--list p {
    text-align: start;
  }

  .movie__info--sub {
    color: #afafaf;
    font-size: 13px;
  }
`;

function CookieMovies() {
  const rankMovies = Array.from({ length: 14 }, (_, i) => ({
    movieId: i + 1,
    title: `영화 ${i + 1}`,
    poster: `https://via.placeholder.com/124x177`,
    plot: `이 영화는 영화 ${i + 1}에 대한 설명입니다.`,
    nation: ["미국", "한국", "대만", "중국", "캐나다", "프랑스"][i % 6],
    released: `20${10 + (i % 20)}`,
    runtime: `${120 + i}분`,
    score: Math.floor(Math.random() * 5) + 1,
    rating: i + 1 <= 10 ? "teenager" : "adult",
    genre: ["스릴러", "액션", "코미디", "드라마", "판타지"][i % 5],
    reviews: Math.floor(Math.random() * 1901) + 100,
    likes: Math.floor(Math.random() * 1701) + 300,
  }));
  return (
    <>
      <CookieMovieList>
        <div className="cookieMovie__title">
          <img src={cookieMovie} alt="cookie_icon" />
          <h2>
            <span>쿠키</span>의 맞춤 추천영화 (<span>쿠키</span>리즘)
          </h2>
        </div>
        <div className="cookie__movie">
          {rankMovies.map((movie, index) => (
            <div key={index} className="cookie__movie--list">
              <img src={movie.poster} alt={movie.title} />
              <div>
                <p>
                  <strong>{movie.title}</strong>
                </p>
                <p>
                  {" "}
                  {movie.released}﹒{movie.nation}
                </p>

                <p className="movie__info--sub">리뷰 : {movie.reviews}개</p>
                <p className="movie__info--sub">좋아요 : {movie.likes}개</p>
              </div>
            </div>
          ))}
        </div>
      </CookieMovieList>
    </>
  );
}

export default CookieMovies;
