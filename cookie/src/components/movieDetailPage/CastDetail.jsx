import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import goBack from "../../assets/images/admin/goBack_br.svg";
import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";

const CastInfo = styled.div`
  padding: 1.25rem;

  .info__title {
    color: var(--text);
    margin-bottom: 1rem;
  }
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0 1.2rem 0;
`;

const DirecrtorInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .info__director {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 6rem;
  }

  .info__director--img {
    border-radius: 0.75rem;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  p {
    color: var(--sub-text);
    margin: 0.5rem 0;
  }
`;

const DirectorMovieInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleGrid = styled.div`
  display: grid;
  grid-template-columns: 6rem 2.5fr 0.7fr 0.9fr 0.9fr;
  gap: 0.625rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.25rem;
  background: none;
  padding: 0.625rem 0;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 0.5px;
    background-color: #e6e6e6;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

const TitleItem = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: start;
`;

const MovieContentGrid = styled.div`
  display: grid;
  grid-template-columns: 6rem 2.5fr 0.7fr 0.9fr 0.9fr;
  gap: 0.625rem;
  align-items: center;
  justify-content: start;
  margin-bottom: 0.625rem;
  padding: 0.625rem 0;
  border-bottom: 0.0625rem solid var(--ticket-bg);

  .movieContent__poster {
    width: 85px;
    height: 122px;
    border-radius: 0.7rem;
    cursor: pointer;
    display: block;
    object-fit: cover;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 0.7rem;
    width: 85px;
    height: 122px;
  }
`;

const ContentItem = styled.div`
  font-size: 0.875rem;
  text-align: start;
  h4 {
    cursor: pointer;
  }
  p {
    margin: 0.8rem 0;
  }
`;

function CastDetail() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const handleNavigate = (path) => {
    navigate(path);
  };
  const isActor = location.pathname.includes("actor");
  const isDirector = location.pathname.includes("director");
  useEffect(() => {
    const fetchData = async () => {
      let url = "";

      if (isActor) {
        url = `${serverBaseUrl}/api/actor/${id}`;
      } else if (isDirector) {
        url = `${serverBaseUrl}/api/director/${id}`;
      }

      try {
        const response = await axios.get(url);
        console.log(response.data.response);
        setData(response.data.response);
      } catch (err) {
        console.error("API 요청 실패:", err);
      }
    };

    fetchData();
  }, [id, location.pathname]);

  if (!data) return null;
  return (
    <>
      <CastInfo>
        <BackBtn onClick={() => handleNavigate(-1)}>
          <img src={goBack} alt="Go Back" />
        </BackBtn>
        <h2 className="info__title">🎬 {isActor ? "배우" : "감독"}</h2>
        <DirecrtorInfoContainer>
          <div className="info__director">
            <img
              className="info__director--img"
              src={data.profileImage || "images/default.png"}
              alt="Director"
            />
            <div>
              <h3>{data.name}</h3>
              <p>{isActor ? "배우" : "감독"}</p>
            </div>
          </div>
        </DirecrtorInfoContainer>
        <h2 className="info__title">🎬 영화</h2>
        <DirectorMovieInfo>
          <TitleGrid>
            <TitleItem />
            <TitleItem>제목</TitleItem>
            <TitleItem>평점</TitleItem>
            <TitleItem>좋아요 수</TitleItem>
            <TitleItem>리뷰 수</TitleItem>
          </TitleGrid>
          {(isActor ? data.actorMovieList : data.directorMovieList)?.map(
            (movie) => (
              <MovieContentGrid key={movie.id}>
                <button onClick={() => handleNavigate(`/movie/${movie.id}`)}>
                  <img
                    className="movieContent__poster"
                    src={movie.poster}
                    alt={`${movie.title} 포스터`}
                  />
                </button>
                <ContentItem>
                  <h4 onClick={() => handleNavigate(`/movie/${movie.id}`)}>
                    {movie.title}
                  </h4>
                  <p>
                    {new Date(movie.releasedAt).getFullYear()}﹒{movie.country}
                  </p>
                </ContentItem>
                <ContentItem>{movie.score}점</ContentItem>
                <ContentItem>{movie.likes}개</ContentItem>
                <ContentItem>{movie.reviews}개</ContentItem>
              </MovieContentGrid>
            )
          )}
        </DirectorMovieInfo>
      </CastInfo>
    </>
  );
}

export default CastDetail;
