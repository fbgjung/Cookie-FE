import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderSection from "../components/movieDetailPage/HeaderSection";
import DetailsSection from "../components/movieDetailPage/DetailsSection";
import CastSection from "../components/movieDetailPage/CastSection";
import VideoSection from "../components/movieDetailPage/VideoSection";
import GallerySection from "../components/movieDetailPage/GallerySection";
import ReviewSection from "../components/movieDetailPage/ReviewSection";
import { useEffect, useState } from "react";
import axiosInstance from "../api/auth/axiosInstance";
import DetailHeader from "../components/searchpage/MovieDetailHeader";

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axiosInstance.get(`/api/movies/${id}`);
        console.log("영화 상세 데이터:", response.data.response);
        setMovieData(response.data.response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovieData();

  }, [id])

  const runtimeString = movieData.runtime ? `${movieData.runtime}분` : "정보 없음";
  
  const handleViewAllReviews = () => {
    // /reviews/movie/:movieId로 이동
    navigate(`/reviews/movie/${id}`);
  };

  return (
    <ContentWrapper>
      <DetailHeader onBack={() => navigate(-1)} />
      <HeaderSection
        title={movieData.title}
        releasedAt={movieData.releasedAt}
        country={movieData.country}
        runtime={runtimeString}
        certification={movieData.certification}
        mainImage={movieData.images ? movieData.images[0] : ""}
      />
      <DetailsSection
        posterUrl={movieData.poster}
        categories={movieData.categories}
        description={movieData.plot}
        likes={movieData.likes}
        score={movieData.score}
        movie={movieData}
        liked={movieData.liked}
      />
      <CastSection 
        director={movieData.director}
        actors={movieData.actors} />
      <VideoSection videoUrl={movieData.video} />
      <GallerySection images={movieData.images} />
      {movieData.reviews && (
      <ReviewSection
        reviews={movieData.reviews}
        reviewCount={movieData.reviews.length}
        onViewAllReviews={handleViewAllReviews}
        movie={movieData}
      />
    )}
    </ContentWrapper>
  );
};

export default MovieDetail;
