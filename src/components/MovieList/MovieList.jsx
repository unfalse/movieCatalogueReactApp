import React from "react";

import './styles.css';

export const MovieList = ({ movies = [] }) => {

	const MovieShortInfo = ({
        movie: {
            posterUrl,
            title,
            genres,
            year,
            director,
            plot,
            actors,
            runtime
        }
    }) => {
        return (
            <div
                className="content__movie-short-info"
            >
                <div className="content__movie-short-info-poster">
                    <img alt="Movie poster" src={posterUrl} />
                </div>
                <div className="content__movie-short-info-text-part">
                    <div className="content__movie-short-info-title">{title}</div>
					<div className="content__movie-short-info-genres">
						{genres.map((g, i) => (<span key={i}>{g}</span>))}
					</div>
                    <div className="content__movie-short-info-year">{year}</div>
                    <div className="content__movie-short-info-director">{director}</div>
                    <div className="content__movie-short-info-actors">{actors}</div>
                    <div className="content__movie-short-info-plot">{plot}</div>
                    <div className="content__movie-short-info-runtime">{runtime} min.</div>
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
