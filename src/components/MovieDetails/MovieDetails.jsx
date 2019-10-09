import React, {useEffect, useState} from 'react';

import {fetchMovie} from '../../apis';

import './MovieDetails.css';

const MovieDetails = ({match}) => {
  const {id} = match.params;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMovie(id).then(movieData => {
      setMovie(movieData);
      console.log(movieData);
    });
  }, [id]);

  const {
    posterUrl = '',
    title = '',
    genres = [],
    year = '',
    director = '',
    plot = '',
    actors = '',
    runtime = '',
  } = movie;
  return (
    <div>
      <a href="/">Go back</a>
      <div className="movie-details">
        <div className="movie-details__poster">
          <img alt="Movie poster" src={posterUrl} />
        </div>
        <div className="movie-details__text-part">
          <div className="movie-details__title">{title}</div>
          <div className="movie-details__genres">
            {genres.map((g, i) => (
              <span key={i}>{g}</span>
            ))}
          </div>
          <div className="movie-details__year">{year}</div>
          <div className="movie-details__director">{director}</div>
          <div className="movie-details__actors">{actors}</div>
          <div className="movie-details__plot">{plot}</div>
          <div className="movie-details__runtime">{runtime} min.</div>
        </div>
      </div>
    </div>
  );
};

export {MovieDetails};
