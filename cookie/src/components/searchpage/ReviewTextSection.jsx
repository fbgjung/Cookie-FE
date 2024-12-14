import styled from "styled-components";

const ReviewText = styled.div`
  font-size: 0.9rem;
  color: #333;
  margin: 0.7rem 2rem;
  line-height: 1.5;

  p {
    margin-bottom: 10px;
    font-weight: 500;
  }
`;

const ReviewTextSection = ({ reviewText }) => {
  return (
    <ReviewText>
      <p>{reviewText}</p>
    </ReviewText>
  );
};

export default ReviewTextSection;
