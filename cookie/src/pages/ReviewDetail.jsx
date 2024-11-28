import { useState } from "react";
import styled from "styled-components";
import DetailHeader from "../components/mypage/DetailHeader";
import ReviewContentSection from "../components/mypage/ReviewContentSection";
import ReviewTextSection from "../components/mypage/ReviewTextSection";
import FooterSection from "../components/mypage/FooterSection";

const Container = styled.div`
  padding: 20px;
  max-width: 768px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const CommentsSectionContainer = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .comment-input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 1rem;
      outline: none;
      margin-right: 10px;
      height: 20px;
    }

    button {
      background-color: #c99d66;
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .comment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    .comment-left {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .comment-content {
        background-color: #f8f8f8;
        border-radius: 8px;
        padding: 10px;
        font-size: 0.9rem;

        .nickname {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .text {
          color: #333;
        }

        .date {
          font-size: 0.8rem;
          color: #666;
          margin-top: 5px;
        }
      }
    }

    .comment-right {
      position: relative;

      button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        gap: 2px; /* 점 세 개 간격 */
      }

      .menu {
        position: absolute;
        top: 100%; /* 아래로 펼치기 */
        left: 0; /* 왼쪽 정렬 */
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        padding: 5px 10px; /* 메뉴 패딩 조정 */
        display: none;
        flex-direction: row; /* 가로로 펼치기 */
        align-items: center;

        &.active {
          display: flex; /* flex로 가로 표시 */
        }

        button {
          all: unset;
          color: #333;
          font-size: 0.9rem;
          cursor: pointer;
          margin-right: 10px; /* 메뉴 항목 간 간격 */
          &:hover {
            color: #c99d66;
          }
        }
      }
    }
  }
`;

const dummyReviewData = {
  movie: {
    poster: "https://via.placeholder.com/150",
    title: "더미 영화 제목",
  },
  user: {
    profileImage: "https://via.placeholder.com/40",
    nickname: "더미사용자",
  },
  createdAt: "2021-01-01T00:00:00Z",
  movieScore: 4.5,
  content: "억지 글래디에이터 감성 주입에 잔인한 액션 추가영화 <글래디에이터 2>는 전쟁영화의 거장으로 불리는 리들리스콧 감독의 역작으로, 그의 작품깨나 봤다 싶은 관객들은 이번에도 황홀스러운 전쟁씬과 전작과 상응하는 재미의 기대를 걸고 극장에 들어설 것이다. 하지만 난 객관적으로 봤을 때 이 작품이 전작만큼 재밌다고, 웅장하다고 생각하진 않는다. 전편과 비교해봤을 때 흐름은 잔잔하고, 액션은 오래 지속되지 않으며, 검투사의 칼끼리 부딪히는 굉음보다는 전쟁으로 고통받는 이의 울음소리가 더 가깝게 다가왔다. 단지, ‘영화계의 전쟁광’으로 묘사되곤 하는 스콧이 왜 이 작품에서는 전쟁씬을 심도있게 다루지 않았을까에 초점을 맞추다 보니 점점 이 작품이 입체적으로 보이기 시작했다.“노예의 꿈은 자유가 아니라, 자신의 노예를 사는 거야.”이 작품의 핵심적 메세지이자 하이라이트씬은 바로 루시우스(폴 메스칼)가 마크리누스(덴젤 워싱턴)와의 전투를 끝내고 대립을 이루고 있는 군대들에게 소리치는 말에 있다고 생각한다. 리들리 스콧 감독은 자신이 만든, 몇 번이고 검을 휘두르고, 피를 흘리는 모습을 스크린으로 접하면서 전쟁의 참혹함을 그 누구보다 가장 가까이서 체감했을 것이다. 전쟁이 멈추고 있지 않은 이 시점에서, 전쟁광 리들리 스콧은 이 작품으로써 과감하게 그것으로부터 타파된다. 마치, 현대사회의 관객들에게 ‘더 이상의 전쟁은 불필요하다고’ 말하고 있는 것만 같았다.“쌍둥이는 숲에 버러졌었는데, 늑대가 그걸 발견하고는 자기 젖을 먹여서 키웠대. 동물의 본성이 로마에 흐르는 거지.”“어떻게 로마에 대해 잘 알아?”“그들이 초래할 일에 대해서는 알지.”",
  comments: [
    {
      user: {
        profileImage: "https://via.placeholder.com/40",
        nickname: "망고리뷰",
      },
      text: "이 리뷰보고 보러갔습니다. 덕분에 영화에 대한 아쉬움에 대해 조금 내려놓고 봤어요 :)",
      createdAt: "2024-11-27T12:00:00Z",
    },
    {
      user: {
        profileImage: "https://via.placeholder.com/40",
        nickname: "금정씨는못말려",
      },
      text: "공감합니다람쥐",
      createdAt: "2024-11-28T10:00:00Z",
    },
  ],
  reviewLike: 10,
};

const ReviewDetail = () => {
  const [newComment, setNewComment] = useState("");
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const handleBack = () => {
    alert("뒤로가기");
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      alert(`댓글 작성: ${newComment}`);
      setNewComment("");
    }
  };

  const toggleMenu = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  return (
    <Container>
      {/* Header */}
      <DetailHeader onBack={handleBack} />

      {/* Review Content Section */}
      <ReviewContentSection
        posterSrc={dummyReviewData.movie.poster}
        profileSrc={dummyReviewData.user.profileImage}
        name={dummyReviewData.user.nickname}
        date={new Date(dummyReviewData.createdAt).toLocaleDateString()}
        movieTitle={dummyReviewData.movie.title}
        movieYearCountry="미국"
        cookieScoreCount={dummyReviewData.movieScore}
      />

      {/* Review Text Section */}
      <ReviewTextSection reviewText={dummyReviewData.content} />
      {/* Footer Section */}
      <FooterSection
        likes={dummyReviewData.reviewLike}
        comments={dummyReviewData.comments.length}
      />

      {/* Comments Section */}
      <CommentsSectionContainer>
        <h3>Comment</h3>

        {/* 댓글 작성란 */}
        <div className="comment-input">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>↑</button>
        </div>

        {/* 댓글 목록 */}
        {dummyReviewData.comments.map((comment, index) => (
          <div className="comment" key={index}>
            <div className="comment-left">
              <img src={comment.user.profileImage} alt="프로필" />
              <div className="comment-content">
                <div className="nickname">{comment.user.nickname}</div>
                <div className="text">{comment.text}</div>
                <div className="date">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="comment-right">
              <button onClick={() => toggleMenu(index)}>⋮</button>
              <div className={`menu ${menuOpenIndex === index ? "active" : ""}`}>
                <button onClick={() => alert("내 댓글 관리")}>
                  내 댓글 관리
                </button>
              </div>
            </div>
          </div>
        ))}
      </CommentsSectionContainer>
    </Container>
  );
};

export default ReviewDetail;