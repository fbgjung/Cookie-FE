import styled from "styled-components";
import useAdminMovieStore from "../../stores/useAdminMovieStore";
import deleteBtn from "../../assets/images/signUp/close_icon.svg";
import { useState } from "react";
import { useRef } from "react";
export const YoutubeAndStillCutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 12rem;
`;

export const YoutubeLink = styled.a`
  color: #0066cc;
  text-decoration: none;
`;

const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
`;
const InfoTitle = styled.p`
  font-weight: 700;
  min-height: 16px;
  width: 100px;
  font-size: 18px;
  margin-right: 1rem;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 850px;
`;
const YoutubeUrl = styled.input`
  width: 20rem;
  height: 2rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  padding: 0 16px;
  font-size: 18px;
`;

export const StillCutContainer = styled.div`
  display: inline-block;
  flex-direction: row;
  gap: 1rem;
  position: relative;
  margin-right: 1rem;

  button {
    background: none;
    border: none;
    position: absolute;
    right: -0.9rem;
    bottom: 7rem;
    cursor: pointer;
  }
`;

export const SitllCut = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: var(--sub-btn);
  color: var(--main);
  border-radius: 18px;
  padding: 0.5rem 1rem;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  position: relative;
  top: 0.4rem;
  cursor: pointer;
`;
const MovieInfoSection = ({ label, children }) => {
  return (
    <InfoContainer>
      <InfoTitle>{label}</InfoTitle>
      <InfoContent>
        <div>{children}</div>
      </InfoContent>
    </InfoContainer>
  );
};

function AddLinkStillCut({ selectedMovie }) {
  const { movieList, setYoutubeLink, setStillCuts } = useAdminMovieStore();
  const fileInputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const movie = movieList.find((movie) => movie.movieId === selectedMovie);

  /*유튜브 링크 추가*/
  const handleAddLink = () => {
    if (!inputValue.trim()) return;

    const updatedLinks = movie.youtube
      ? [...new Set([...movie.youtube.split(", "), inputValue.trim()])]
      : [inputValue.trim()];

    setYoutubeLink(movie.movieId, updatedLinks.join(", "));
    setInputValue("");
  };

  /*유튜브 링크 삭제*/
  const handleDeleteYoutubeLink = (link) => {
    const updatedLinks = movie.youtube
      .split(", ")
      .filter((existingLink) => existingLink !== link);

    setYoutubeLink(movie.movieId, updatedLinks.join(", "));
  };

  /*썸네일 업로드*/
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (movie.stillCuts.length + files.length > 3) {
      alert("최대 3개까지 업로드 가능합니다.");
      return;
    }
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    const updatedStillCuts = [...movie.stillCuts, ...fileURLs];
    setStillCuts(movie.movieId, updatedStillCuts);
  };

  /*썸네일 삭제*/
  const handleDeleteThumbnail = (index) => {
    const updatedFiles = movie.stillCuts.filter((_, idx) => idx !== index);
    setStillCuts(movie.movieId, updatedFiles);
  };

  return (
    <YoutubeAndStillCutContainer>
      <MovieInfoSection label="유튜브">
        <YoutubeUrl
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ex) http://www.youtube.com"
        />
        <Button onClick={handleAddLink}>링크 추가</Button>

        {movie.youtube &&
          movie.youtube.split(", ").map((link, index) => (
            <div key={index}>
              📎
              <YoutubeLink
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </YoutubeLink>
              <DeleteBtn onClick={() => handleDeleteYoutubeLink(link)}>
                <img src={deleteBtn} alt="delete_button" />
              </DeleteBtn>
            </div>
          ))}
      </MovieInfoSection>

      <MovieInfoSection label="스틸컷">
        {movie?.stillCuts && movie.stillCuts.length > 0
          ? movie.stillCuts.map((image, index) => (
              <StillCutContainer key={index}>
                <SitllCut src={image} alt={`Still cut ${index + 1}`} />
                <button onClick={() => handleDeleteThumbnail(index)}>
                  <img src={deleteBtn} alt="delete_button" />
                </button>
              </StillCutContainer>
            ))
          : null}

        {movie?.stillCuts.length < 3 && (
          <Button onClick={() => fileInputRef.current.click()}>
            파일 업로드
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </MovieInfoSection>
    </YoutubeAndStillCutContainer>
  );
}

export default AddLinkStillCut;
