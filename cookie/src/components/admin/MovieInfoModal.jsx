import styled from "styled-components";
import {
  SitllCut,
  StillCutContainer,
  YoutubeAndStillCutContainer,
  YoutubeLink,
} from "./AddLinkStillCut";
import {
  ActorItem,
  MovieContainer,
  MovieDetail,
  MovieInfo,
  MovieInfoSection,
  MovieRow,
  MovieTitle,
  SubmitBtn,
} from "./SearchMovieDetail";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/auth/axiosInstance";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(16, 16, 16, 0.57);
  z-index: 999;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 1650px;
  height: 800px;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(35, 35, 35, 0.1);
  overflow: scroll;
  padding: 0 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 2%;
  transform: translateX(-50%);
`;

const MovieInfoModal = ({ movie, onClose }) => {
  const [modalMovie, setModalMovie] = useState(movie);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/movie/${movie.movieId}/detail`
        );
        console.log(response);
        setModalMovie(response.data.response);
      } catch (error) {
        console.error("영화 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    if (movie && movie.movieId) {
      fetchMovieDetails();
    }
  }, [movie]);

  if (!modalMovie) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <MovieDetail>
          <MovieContainer key={modalMovie.movieId}>
            <MovieRow>
              <img
                className="movie__poster"
                src={modalMovie.posterPath}
                alt={modalMovie.title}
              />
              <MovieInfo>
                <MovieTitle>{modalMovie.title}</MovieTitle>

                {[
                  { label: "러닝타임", value: `${modalMovie.runtime}분` },
                  { label: "개봉일", value: modalMovie.releaseDate },
                  { label: "연령", value: modalMovie.certification },
                  { label: "국가", value: modalMovie.country },
                  { label: "줄거리", value: modalMovie.plot },
                  {
                    label: "카테고리",
                    value: Array.isArray(modalMovie.categories)
                      ? modalMovie.categories.join(", ")
                      : "카테고리 정보 없음",
                  },
                ].map((section, index) => (
                  <MovieInfoSection key={index} label={section.label}>
                    {section.value}
                  </MovieInfoSection>
                ))}

                <MovieInfoSection label="감독">
                  <ActorItem actor={modalMovie.director || "감독 정보 없음"} />
                </MovieInfoSection>

                <MovieInfoSection label="배우">
                  {Array.isArray(modalMovie.actors) &&
                  modalMovie.actors.length > 0 ? (
                    modalMovie.actors.map((actor, index) => (
                      <ActorItem key={index} actor={actor} />
                    ))
                  ) : (
                    <p>배우 정보 없음</p>
                  )}
                </MovieInfoSection>
              </MovieInfo>
            </MovieRow>
            <YoutubeAndStillCutContainer>
              <MovieInfoSection label="유튜브">
                {modalMovie.youtube &&
                  modalMovie.youtube.split(", ").map((link, index) => (
                    <div key={index}>
                      📎
                      <YoutubeLink
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link}
                      </YoutubeLink>
                    </div>
                  ))}
              </MovieInfoSection>

              <MovieInfoSection label="스틸컷">
                {Array.isArray(modalMovie.stillCuts) &&
                modalMovie.stillCuts.length > 0 ? (
                  modalMovie.stillCuts.map((image, index) => (
                    <StillCutContainer
                      key={index}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "80%",
                      }}
                    >
                      <SitllCut src={image} alt={`Still cut ${index + 1}`} />
                    </StillCutContainer>
                  ))
                ) : (
                  <p>스틸컷 정보 없음</p>
                )}
              </MovieInfoSection>
            </YoutubeAndStillCutContainer>
            <ButtonContainer>
              <SubmitBtn onClick={onClose}>X</SubmitBtn>
            </ButtonContainer>
          </MovieContainer>
        </MovieDetail>
      </ModalContainer>
    </>
  );
};

export default MovieInfoModal;
