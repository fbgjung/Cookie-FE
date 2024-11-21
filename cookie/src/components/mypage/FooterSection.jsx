import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  margin-top: auto;

  .likes-comments {
    display: flex;
    align-items: center;

    .icon {
      font-size: 1rem;
      margin-right: 5px;
      color: #666;
    }

    .count {
      margin-right: 15px;
    }
  }
`;

const FooterSection = ({ likes, comments }) => {
  return (
    <Footer>
      <div className="likes-comments">
        <div className="count">
          ❤️ {likes} <span>| 💬 {comments}</span>
        </div>
      </div>
    </Footer>
  );
};

export default FooterSection;