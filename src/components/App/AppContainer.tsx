// import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppViewer } from './AppViewer';
import { fetchMoviesAction, filterAction, searchAction } from '../../redux/reducers/movieCatalogueActions';
import { ReduxState } from '../../types/redux';
import { Dispatch } from 'react';
import { StateProps, DispatchProps } from './types';
import { PaginatedMovies } from '../../types';

const mapStateToProps = (state: ReduxState): StateProps => {
    const { genres, movies, isLoading } = state;
    return {
        genres,
        paginatedMovies: movies as PaginatedMovies,
        isLoading
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    fetchMovies: (filterParam: string, searchParam: string) => dispatch(fetchMoviesAction(filterParam, searchParam)),
    onFilter: () => dispatch(filterAction()),
    onSearch: () => dispatch(searchAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppViewer);

// import { HashRouter as Router, Route } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// import { AppViewer } from './AppViewer';
// import { fetchMovies } from '../../apis';
// import { MovieDetails } from '../MovieDetails';
// import { Header } from '../Header';
// import { Footer } from '../Footer';
// import { Genre, RawMoviesData, Movie } from '../../types/movie';



// export const AppContainer: React.FunctionComponent = () => {
//     const [movies, setMovies] = useState<Array<Movie>>([]);
//     const [genres, setGenres] = useState<Array<Genre>>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         async function scopedFetchMovies() {
//             const res: RawMoviesData = await fetchMovies();
//             setMovies(res.movies);
//             setGenres(['None', ...res.genres]);
//             setLoading(false);
//         }
//         scopedFetchMovies();
//     }, []);


// };
