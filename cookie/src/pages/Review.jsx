import ReviewFeed from "../components/reviewFeedPage/ReviewFeed";

const Review = () => {
  const reviews = [
    {
      moviePoster: "https://via.placeholder.com/100x150?text=글래디에이터",
      movieTitle: "글래디에이터",
      director: "김감독",
      userImage: "https://via.placeholder.com/40x40?text=유저",
      userName: "영화만보는사람",
      time: "오늘",
      comment: "내용이 미쳤다",
      containsSpoiler: false,
    },
    {
      moviePoster: "https://via.placeholder.com/100x150?text=글래디에이터",
      movieTitle: "글래디에이터",
      director: "김감독",
      userImage: "https://via.placeholder.com/40x40?text=유저",
      userName: "영화만보는사람",
      time: "오늘",
      comment: "스포일러가 포함된 리뷰입니다",
      containsSpoiler: true,
    },
  ];

  return <ReviewFeed reviews={reviews} />;
};

export default Review;