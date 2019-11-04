import React from 'react';

import {ImgFallback} from '../ImgFallback';
import NoPoster from '../../assets/noposter.png';

import './styles.css';

export const MovieList = ({movies = [], history}) => {
  const MovieShortInfo = ({movie}) => {
    const {posterUrl, title, genres, year, director, plot, runtime, id} = movie;
    const gotoMovieDetails = () => {
      history.push(`/movie/${id}`);
    }
    return (
      <div className="content__movie-short-info" onClick={gotoMovieDetails}>
        <div className="content__movie-short-info-poster">
          <ImgFallback alt="Movie poster" src={posterUrl} srcFallback={NoPoster}/>
        </div>

        <div className="content__movie-short-info-text-part">
          <div className="content__movie-short-info-title-year-genres">
            <div className="content__movie-short-info-title">{title}</div>
            <div className="content__movie-short-info-year">{year}</div>
            <div className="content__movie-short-info-genres">
              {genres.map((g, i) => (
                <span key={i}>{g}</span>
              ))}
            </div>
          </div>

          <div className="content__movie-short-info-director">{director}</div>
          <div className="content__movie-short-info-plot">{plot}</div>
          <div className="content__movie-short-info-runtime">
            {runtime} min.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="content__movie-list">
      {movies.map(m => (
        <MovieShortInfo movie={m} key={m.id} />
      ))}
    </div>
  );
};
