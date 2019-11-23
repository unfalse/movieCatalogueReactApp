import React, { useEffect, useState } from 'react';

import { fetchMovie } from '../../apis';
import { ImgFallback } from '../ImgFallback';
import NoPoster from '../../assets/noposter.png';

import './styles.css';

const MovieDetails = ({ match, history }) => {
    const { id } = match.params;
    const [movie, setMovie] = useState({});
    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        fetchMovie(id).then(movieData => {
            setMovie(movieData);
        });
    }, []);

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
            <button className="button" onClick={goBack}>
                Return to movie list
            </button>
            <div className="movie-details center">
                <div className="title">{title}</div>
                <div className="movie-details__genres">
                    {genres.map((g, i) => (
                        <span className="tag is-info" key={i}>
                            {g}
                        </span>
                    ))}
                </div>
                <div className="movie-details__year">{year}</div>
                <div className="movie-details__poster">
                    <ImgFallback
                        alt="Movie poster"
                        src={posterUrl}
                        srcFallback={NoPoster}
                    />
                </div>
                <div className="movie-details__text-part">
                    <div className="movie-details__header">director(s)</div>
                    <div className="movie-details__director">{director}</div>
                    
                    <div className="movie-details__header">stars</div>
                    <div className="movie-details__actors">{actors}</div>
                    
                    <div className="movie-details__header">plot</div>
                    <div className="movie-details__plot">{plot}</div>
                    <div className="movie-details__runtime">{runtime} min.</div>
                </div>
            </div>
        </div>
    );
};

export { MovieDetails };
