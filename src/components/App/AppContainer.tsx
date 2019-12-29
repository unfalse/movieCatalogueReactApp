import { connect } from 'react-redux';

import { AppViewer } from './AppViewer';
import { fetchMoviesAction, filterAction, searchAction } from '../../redux/reducers/movieCatalogueActions';
import { ReduxState } from '../../types/redux';
import { Dispatch } from 'react';
import { StateProps, DispatchProps } from './types';
import { Movie } from '../../types';

const applyFilter = (
    items: Array<Movie>,
    filterParam = 'None'
): Array<Movie> => {
    let filteredItems: Array<Movie> = [];
    if (filterParam === '' || filterParam === 'None') return items;
    items.forEach((item: Movie) => {
        if (!item.genres) console.log(item);
        if (item.genres.indexOf(filterParam) >= 0) {
            filteredItems.push(item);
        }
    });
    return filteredItems;
};

const applySearch = (
    items: Array<Movie>,
    searchParam: string
): Array<Movie> => {
    const result = items.filter(
        item => item.title.toLowerCase().indexOf(searchParam.toLowerCase()) >= 0
    );
    return result;
};

const mapStateToProps = ({ genres, movies, isLoading, filterParam, searchParam }: ReduxState): StateProps => ({
    genres,
    movies: applySearch(applyFilter(movies, filterParam), searchParam),
    isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    fetchMovies: (filterParam: string, searchParam: string) => dispatch(fetchMoviesAction(filterParam, searchParam)),
    onFilter: (filterParam: string) => dispatch(filterAction(filterParam)),
    onSearch: (searchParam: string) => dispatch(searchAction(searchParam))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppViewer);