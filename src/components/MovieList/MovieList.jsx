import React from 'react';
import { useLocation } from 'react-router-dom';

import { ImgFallback } from '../ImgFallback';
import { getQueryParams } from '../../utils/url';
import NoPoster from '../../assets/noposter.png';

import './styles.css';

export const MovieList = ({ movies = [], history }) => {
    const MovieShortInfo = ({ movie }) => {
        const {
            posterUrl,
            title,
            genres,
            year,
            director,
            plot,
            runtime,
            id,
        } = movie;
        const gotoMovieDetails = () => {
            history.push(`/movie/${id}`);
        };
        return (
            <div
                className="movie-list__short-info columns is-desktop"
                onClick={gotoMovieDetails}
            >
                <div className="movie-list__short-info-poster column is-2-desktop is-full-mobile is-2-tablet">
                    <img alt="Movie poster" src={posterUrl} />
                    {/* <ImgFallback
                        alt="Movie poster"
                        src={posterUrl}
                        srcFallback={NoPoster}
                    /> */}
                </div>

                <div className="movie-list__short-info-text-part column">
                    <div className="movie-list__short-info-title-year-genres">
                        <div className="movie-list__short-info-title">
                            {title}
                        </div>
                        <div className="movie-list__short-info-year">
                            {year}
                        </div>
                        <div className="movie-list__short-info-genres">
                            {genres.map((g, i) => (
                                <span key={i} className="tag is-info">{g}</span>
                            ))}
                        </div>
                    </div>

                    <div className="movie-list__short-info-director">
                        {director}
                    </div>
                    <div className="movie-list__short-info-plot">{plot}</div>
                    <div className="movie-list__short-info-runtime">
                        {runtime} min.
                    </div>
                </div>
            </div>
        );
    };

    const location = useLocation();
    const { searchParam } = getQueryParams(location);

    return (
        <div className="movie-list">
            {
                movies.length === 0 &&
                <div className="is-italic subtitle has-text-centered">
                        {`Nothing found on query "${searchParam}". Try to change the query.`}
                    </div>
            }
            {movies.map(m => (
                <MovieShortInfo movie={m} key={m.id} />
            ))}
        </div>
    );
};
