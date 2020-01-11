import React, { FunctionComponent } from 'react';
import { useLocation, RouteComponentProps } from 'react-router-dom';

import { MyLoader } from '../MyLoader';
import { ImgFallback } from '../ImgFallback';
import { getQueryParams } from '../../utils/url';
import { ITEMS_PER_PAGE } from '../../utils/const';
import NoPoster from '../../assets/noposter.png';
import { Movie } from '../../types';

import './styles.css';

interface Props extends RouteComponentProps {
    movies: Array<Movie>;
    loading: boolean;
}

interface MovieShortInfoProps {
    movie: Movie;
}

export const MovieList: FunctionComponent<Props> = ({ movies = [], history, loading }) => {
    const MovieShortInfo: FunctionComponent<MovieShortInfoProps> = ({ movie }) => {
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
                    <ImgFallback
                        alt="Movie poster"
                        src={posterUrl}
                        srcFallback={NoPoster}
                    />
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
                            {genres.map((g: string) => (
                                <span key={g} className="tag is-info">{g}</span>
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
            {movies.length === 0 && (
                <div className="is-italic subtitle has-text-centered">
                    {loading ? (
                        <div>
                            {Array(ITEMS_PER_PAGE).fill(0).map((item: number, itemIndex: number) => (<MyLoader key={`myloader_${itemIndex}`} />))}
                        </div>
                    ) : (
                        `Nothing found on query ${searchParam}. Try to change the query.`
                    )}
                </div>
            )}
            {movies.map(m => (
                <MovieShortInfo movie={m} key={`movieShortInfo_${m.id}`} />
            ))}
        </div>
    );
};
