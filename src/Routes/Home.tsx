import React, { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "./utils";

import "remixicon/fonts/remixicon.css";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 35px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
  margin-bottom: 20px;
  line-height: 30px;
`;

const PlayButton = styled.div`
  background-color: #00a7f6;
  display: inline-block;
  width: 200px;
  padding: 12px 25px;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #006eb3;
  }

  .play_button_box {
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      margin-right: 10px;
      font-size: 30px;
    }
    span {
      display: block;
      font-size: 16px;
    }
  }
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
  padding: 20px;
`;

const SliderTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 150px;
  font-size: 66px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.darker};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: -99%;

  h4 {
    padding: 5px;

    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
  }
`;

const InfoDetails = styled.div``;

const InfoRating = styled.div`
  display: flex;
  padding: 5px;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 10px;

  i {
    color: skyblue;
    margin-right: 3px;
  }
  .vote_average {
    margin-right: 3px;
  }
  .vote_count {
    margin-right: 5px;
  }
`;

const InfoButtons = styled.div`
  padding: 5px;

  display: flex;
  justify-content: space-between;

  .Info_left {
    font-size: 35px;
    font-weight: 300;
  }
  .Info_right {
    font-size: 35px;
    font-weight: 300;
    color: whitesmoke;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  border-radius: 15px;
  overflow: hidden;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h2`
  position: relative;
  padding: 10px;
  color: ${(props) => props.theme.white.lighter};
  text-align: left;
  font-size: 46px;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 20px;
  top: -80px;
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth - 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

// Pagination

const offset = 6;
// 한 번에 보여주고 싶은 영화 수

export default function Home() {
  const navigate = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");
  const { scrollY } = useScroll();

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  // 리액트 쿼리, 비동기 로직을 리액트스럽게 다룰 수 있게 해줌
  // isLoading, isError, refetch, 데이터 캐싱을 제공해줌

  console.log(data);

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      // leaving이 true면 아무것도 하지 않을 것
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClick = () => navigate(-1);
  // 주변부 클릭했을 때 창 사라지게 하는 또 다른 방식 : navigate 쓰기
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  console.log(clickedMovie);

  return (
    <Wrapper style={{ height: "200vh" }}>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[9].backdrop_path || "")}
          >
            <Title>{data?.results[9].title}</Title>
            <Overview>{data?.results[9].overview}</Overview>
            <PlayButton className="play_button">
              <div className="play_button_box">
                <i className="ri-play-line"></i>
                <span>재생하기</span>
              </div>
            </PlayButton>
          </Banner>

          <Slider>
            <SliderTitle>이번주 인기작 TOP 10</SliderTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              {/*
              initial props : 컴포넌트가 처음 렌더링될 때 자식의 초기 애니메이션을 비활성화합니다.
              on ExitComplete props :exit 중인 모든 노드들이 애니메이션을 끝내면 실행됩니다. */}
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClick(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                        <InfoDetails>
                          <InfoRating>
                            <i className="ri-star-fill"></i>
                            <span className="vote_average">
                              {movie.vote_average}
                            </span>
                            <span className="vote_count">
                              ({movie.vote_count})
                            </span>
                            <span className="release_date">
                              {movie.release_date.substring(0, 4)}
                            </span>
                          </InfoRating>
                        </InfoDetails>
                        <InfoButtons>
                          <div className="Info_left">
                            <i className="ri-play-circle-line"></i>
                            <i className="ri-add-circle-line"></i>
                          </div>
                          <div className="Info_right">
                            <i className="ri-information-fill"></i>
                          </div>
                        </InfoButtons>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
        // Fragment: 많은 요소를 부모 없이 연이어서 리턴할 수 있는 방법
      )}
    </Wrapper>
  );
}
