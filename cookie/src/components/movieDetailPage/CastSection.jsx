import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Title = styled.h2`
  margin-top: 50px;
  color: white;
`;

const CastGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;

  .cast-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 5px;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: scale(1.2);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      }
    }

    span {
      font-size: 12px;
      color: white;
    }
  }
`;

const CastSection = ({ actors = [], director }) => {
  const navigate = useNavigate();

  const castList = [
    { ...director, role: "director" },
    ...actors.map((actor) => ({ ...actor, role: "actor" })),
  ];

  const handleCastClick = (id, role) => {
    if (role === "director") {
      navigate(`/movie/director/${id}`);
    } else {
      navigate(`/movie/actor/${id}`);
    }
  };

  return (
    <div>
      <Title>출연/제작</Title>
      <CastGrid>
        {castList.map((person, index) => (
          <div
            key={index}
            className="cast-item"
            onClick={() => handleCastClick(person.id, person.role)}
          >
            <img
              src={
                person.profileImage?.endsWith("/null")
                  ? "/images/default.png"
                  : person.profileImage || "/images/default.png"
              }
              alt={person.name}
            />
            <span>{person.name} </span>
            <span>{person.role === "director" ? "감독" : "출연"}</span>
          </div>
        ))}
      </CastGrid>
    </div>
  );
};

CastSection.propTypes = {
  director: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string,
  }).isRequired,
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
    })
  ).isRequired,
};

export default CastSection;
