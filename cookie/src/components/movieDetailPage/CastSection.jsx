import PropTypes from "prop-types";
import styled from "styled-components";

const CastGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;

  .cast-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 5px;
    }

    span {
      font-size: 12px;
      color: #333;
    }
  }
`;

const CastSection = ({ cast }) => {
  return (
    <div>
      <h2>출연/제작</h2>
      <CastGrid>
        {cast.map((person, index) => (
          <div className="cast-item" key={index}>
            <img src={person.img} alt={person.name} />
            <span>{person.name}</span>
            <span>{person.role}</span>
          </div>
        ))}
      </CastGrid>
    </div>
  );
};

// PropTypes 정의
CastSection.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // name은 string 타입의 필수 항목
      role: PropTypes.string.isRequired, // role은 string 타입의 필수 항목
      img: PropTypes.string.isRequired,  // img는 string 타입의 필수 항목
    })
  ).isRequired, // cast는 배열 타입이며 필수 props
};

export default CastSection;