import React from "react";

/*

<div style="">
	<img alt="Movie poster" src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg" width="250px">
</div>
<div style="padding: 20px;">
	<div style="font-size: 22pt;font-weight: 600;font-family: Courier New;">City of God</div>
	<div style="border: 1px solid blue;border-radius: 6px;color: white;background-color: blue;font-weight: 600;padding: 5px;">Crime, Drama</div>
	<div style="font-family: Arial;text-decoration: underline;">2002</div>
	<div style="font-size: 0.8rem;">Fernando Meirelles, KÃ¡tia Lund</div>
	<div style="font-size: 0.8rem;">Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva</div>
	<div style="margin-top: 10px;margin-bottom: 10px;">Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.</div>
	<div style="font-size: 0.8rem;font-family: Arial;font-style: italic;">130 min.</div>
</div>

 */
/*
.content__movie-short-info-poster img {
	height: 250px;
}

.content__movie-short-info-title {
	font-size: 22pt;
	font-weight: 600;
	font-family: Courier New;
}

.content__movie-short-info-genres {
	border: 1px solid blue;
	border-radius: 6px;
	color: white;
	background-color: blue;
	font-weight: 600;
	padding: 5px;	
}

.content__movie-short-info-year {
	font-family: Arial;
	text-decoration: underline;
}

.content__movie-short-info-director {
	font-size: 0.8rem;
}

.content__movie-short-info-actors {
	font-size: 0.8rem;
}

.content__movie-short-info-plot {
	margin-top: 10px;
	margin-bottom: 10px;
}

.content__movie-short-info-runtime {
	font-size: 0.8rem;
	font-family: Arial;
	font-style: italic;
}

 */

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
						{genres.map(g => (<span>{g}</span>))}
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
