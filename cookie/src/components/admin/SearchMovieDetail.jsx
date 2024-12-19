import styled from "styled-components";
import frame from "../../assets/images/admin/frame.svg";
import back from "../../assets/images/admin/goBack.svg";
import AddLinkStillCut from "./AddLinkStillCut";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/auth/axiosInstance";

const flexRowCenter = `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AddMovieDetail = styled.div`
  margin: 1rem;
  min-height: 1200px;
  border: 1px solid #000000;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  position: absolute;
  padding: 0.8rem 1rem;
  background-color: #000000;
  height: 32px;
  border-radius: 11px;
  width: 1175px;
  display: flex;
  justify-content: start;
  align-items: center;
  color: #ffffff;
  font-weight: 700;

  button {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 1rem;
  }

  p {
    font-size: 20px;
  }

  img {
    margin-left: auto;
  }
`;

export const MovieDetail = styled.div`
  display: flex;
  margin: 40px 10px;
  height: 600px;
  background-color: white;
  color: #333;
`;

export const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
`;

export const MovieRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  .movie__poster {
    border-radius: 10px;
    width: 177px;
    height: 245px;
  }
`;

export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  width: 100%;
`;

export const MovieTitle = styled.h1`
  margin-bottom: 0.5rem;
`;

export const Label = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-right: 1rem;
  width: 100px;
`;

export const ActorProfile = styled.img`
  border-radius: 10px;
  margin-right: 0.5rem;
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

export const ButtonWrapper = styled.div`
  ${flexRowCenter}
  margin:3rem 1rem 0 0;
  display: flex;
  justify-content: end;
`;

export const SubmitBtn = styled.button`
  background-color: white;
  color: #000000;
  border-radius: 12px;
  padding: 5px 10px;
  border: 1px solid #000000;
  font-size: 18px;

  cursor: pointer;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;
export const MovieInfoSection = ({ label, children }) => {
  return (
    <div style={{ display: "flex", marginBottom: "1rem" }}>
      <Label>{label}</Label>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "800px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const ActorItem = ({ actor }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      marginRight: "4px",
      height: "97px",
      width: "80px",
    }}
  >
    <ActorProfile src={actor.profilePath} alt={actor.name} />
    <span
      style={{ textAlign: "center", width: "70px", wordBreak: "break-word" }}
    >
      {actor.name}
    </span>
  </div>
);

const SearchMovieDetail = ({ selectedMovie, handleGoBack }) => {
  const [movie, setMovie] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [additionalStillCuts, setAdditionalStillCuts] = useState([]); // 추가된 스틸컷 상태

  useEffect(() => {
    if (selectedMovie) {
      setMovie(selectedMovie);
    }
  }, [selectedMovie]);
  if (!movie) {
    return <p>영화 정보를 불러오는 중입니다...</p>;
  }
  const handleSetAdditionalStillCuts = (newCuts) => {
    setAdditionalStillCuts(newCuts); // 추가된 스틸컷 상태 업데이트
  };
  const handleSelect = async () => {
    try {
      const movieData = {
        movieId: movie.movieId,
        title: movie.title,
        director: {
          name: movie.director.name,
          profilePath: movie.director.profilePath,
          tmdbCasterId: movie.director.tmdbCasterId,
        },
        runtime: movie.runtime,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
        certification: movie.certification,
        country: movie.country,
        plot: movie.plot,
        youtube: movie.youtube,
        stillCuts: [...movie.stillCuts, ...additionalStillCuts],
        actors: movie.actors.map((actor) => ({
          name: actor.name,
          profilePath: actor.profilePath,
          tmdbCasterId: actor.tmdbCasterId,
        })),
        categories: movie.categories || [],
      };

      const registerResponse = await axiosInstance.post(
        `/api/admin/movie`,
        movieData
      );
      alert("영화가 등록되었습니다!");
      setIsSelected(true);
    } catch (error) {
      if (error.response?.status === 400) {
        alert("이미 등록된 영화입니다.");
      } else {
        alert("영화 등록에 실패했습니다.");
      }
    }
  };
  return (
    <AddMovieDetail>
      <ButtonWrapper>
        <SubmitBtn $isSelected={isSelected} onClick={handleSelect}>
          등록하기
        </SubmitBtn>
      </ButtonWrapper>
      <TitleContainer>
        <button onClick={handleGoBack}>
          <img src={back} alt="back" />
        </button>
        <p>영화상세정보</p>
        <img src={frame} alt="frame" />
      </TitleContainer>
      <MovieDetail>
        <MovieContainer key={movie.movieId}>
          <MovieRow>
            <img
              className="movie__poster"
              src={movie.posterPath}
              alt={movie.title}
            />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>

              {[
                { label: "러닝타임", value: `${movie.runtime}분` },
                { label: "개봉일", value: movie.releaseDate },
                { label: "연령", value: movie.certification },
                { label: "국가", value: movie.country },
                { label: "줄거리", value: movie.plot },
                {
                  label: "카테고리",
                  value: movie.categories
                    ? movie.categories.join(", ")
                    : "정보 없음",
                },
              ].map((section, index) => (
                <MovieInfoSection key={index} label={section.label}>
                  {section.value}
                </MovieInfoSection>
              ))}

              <MovieInfoSection label="감독">
                <ActorItem actor={movie.director} />
              </MovieInfoSection>

              <MovieInfoSection label="배우">
                {movie.actors.map((actor, index) => (
                  <ActorItem key={index} actor={actor} />
                ))}
              </MovieInfoSection>
            </MovieInfo>
          </MovieRow>

          <AddLinkStillCut
            selectedMovie={selectedMovie}
            stillCuts={movie.stillCuts}
            onUpdateStillCuts={handleSetAdditionalStillCuts}
          />
        </MovieContainer>
      </MovieDetail>
    </AddMovieDetail>
  );
};

export default SearchMovieDetail;
