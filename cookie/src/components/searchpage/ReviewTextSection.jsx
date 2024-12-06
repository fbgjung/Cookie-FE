import styled from "styled-components";

const ReviewText = styled.div`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;

  p {
    margin-bottom: 10px;
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