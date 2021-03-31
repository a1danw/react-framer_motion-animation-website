import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MovieState } from "../movieState";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";

const MovieDetail = () => {
  const history = useHistory();
  const url = history.location.pathname; //gets us the url
  const [movies, setMovies] = useState(MovieState);
  //extract specific movie based on url
  const [movie, setMovie] = useState(null);

  //updated the specific movie when the page loads
  //when component first loads up it updates to the specific movie
  useEffect(() => {
    //grab movies and find out which movie we are on
    //comparing movies url in the state to which page url we are currently on
    const currentMovie = movies.filter((stateMovie) => stateMovie.url === url);
    setMovie(currentMovie[0]);
  }, [movies, url]);

  console.log(movie); //we have an array of an object - movies is an array of objects
  //when we filter out the movies we still have an array of an object
  //we need to access this array before we do movie.title otherwise it wont work
  //when we use filter on an array were still left with an array so need to extract the content from it
  //   setMovie(currentMovie[0]);

  return (
    <>
      {/* if the movies not available dont render anything out */}
      {movie && (
        <Details
          exit="exit"
          variants={pageAnimation}
          initial="hidden"
          animate="show"
        >
          <HeadLine>
            <h2>{movie.title}</h2>
            <img src={movie.mainImg} alt="movie" />
          </HeadLine>
          <Awards>
            {movie.awards.map((award) => (
              <Award
                title={award.title}
                description={award.description}
                key={award.title}
              />
            ))}
          </Awards>
          <ImageDisplay>
            <img src={movie.secondaryImg} />
          </ImageDisplay>
        </Details>
      )}
    </>
  );
};

const Details = styled(motion.div)`
  color: white;
`;
const HeadLine = styled.div`
  min-height: 90vh;
  padding-top: 20vh;
  position: relative;
  h2 {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -10%);
  }
  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
`;

const Awards = styled.div`
  min-height: 80vh;
  display: flex;
  margin: 5rem 10rem;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 1300px) {
    display: block;
    margin: 2rem 2rem;
  }
`;

const AwardStyle = styled.div`
  padding: 5rem;
  h3 {
    font-size: 2rem;
  }
  .line {
    width: 100%;
    background: #23d997;
    height: 0.5rem;
    margin: 1rem 0rem;
  }
  p {
    padding: 2rem 0rem;
  }
`;

const ImageDisplay = styled.div`
  min-height: 50vh;
  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;

//Award Component
const Award = ({ title, description }) => {
  return (
    <AwardStyle>
      <h3>{title}</h3>
      <div className="line"></div>
      <p className="description">{description}</p>
    </AwardStyle>
  );
};

export default MovieDetail;

//dynamic content in react
//useHistory is used if were not working from an api
//its simpler to do if we have an api

//3 methods for the individual movies
// 1. create components for each of them so we can customize each the way we want
// 2. do a comparison use React routers history - check the path of the current page were on - compare it to the url from the movies state
// 3. the ideal way to do it is with an api which is much more simple - fetch the movie based on the url
