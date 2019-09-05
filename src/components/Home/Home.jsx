import React, { useEffect, useState } from "react";

import { fetchMovies } from "../../apis";
import { MovieList } from "../MovieList";
import { Pagination } from "../Pagination";
import { Filter } from '../Filter';

const ITEMS_PER_PAGE = 3;

const getQueryParams = () => {
	const { search } = window.location;
	const params = new URLSearchParams(search);
	const filterParam = params.get('filter');
	return { filterParam: filterParam || 'None' };
};

// Returns an array of movies chunks divided by pages
// TODO: fix a bug with the last empty page!
const preparePagination = (items) => {
    const pagesCount = Math.floor(items.length / ITEMS_PER_PAGE);
	let pagedMovies = [];
	let pageNumber = 0, currentPagePosition = 0;
	while(pageNumber <= pagesCount) {
		pagedMovies.push({
			pageNumber,
			moviesData: items.slice(currentPagePosition, currentPagePosition + ITEMS_PER_PAGE)
		});
		pageNumber++;
		currentPagePosition = ITEMS_PER_PAGE * pageNumber;
	}
	return pagedMovies;
}

const getGenres = (items) => {
	let genres = [];
	items.forEach(item => {
		item.genres.forEach(genre => {
			if (genres.indexOf(genre) < 0) {
				genres.push(genre);
			}
		});
	});
	return [].concat(['None'], genres);
}

const setFilter = (items, filterParam = 'None') => {
	let filteredItems = [];
	if (filterParam === 'None') return items;
	items.forEach(item => {
		if (!item.genres) console.log(item);
		if (item.genres.indexOf(filterParam) >= 0) {
			filteredItems.push(item);
		}
	});
	return filteredItems;
}

const setSearch = (items) => {
	return items;
}

const prepareData = (items) => {
	const { filterParam } = getQueryParams();
	const paginatedMovies = preparePagination( setFilter(items, filterParam) );
	return {
		paginatedMovies,
		filterParam
	};
}

// TODO: this seems like a bad decision. I should move some pagination logic into Pagination component
const paginatedMoviesToArray = movies => {
	const res = movies.reduce((moviesArr, paginatedData) => moviesArr.concat(paginatedData.moviesData), []);
	return res;
}

export const Home = () => {
	const [sourceMovies, setSourceMovies] = useState([]);
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [filterParamFromQuery, setFilterParam] = useState('None');

	useEffect(() => {
		fetchMovies().then(res => {
			setSourceMovies(res.movies);
			const { paginatedMovies, filterParam } = prepareData(res.movies);
			const genres = getGenres(res.movies);
			setMovies(paginatedMovies);
			setGenres(genres);
			setFilterParam(filterParam);
		});
	}, []);

	const onFilter = () => {
		// const { paginatedMovies } = prepareData(paginatedMoviesToArray(movies));
		const { paginatedMovies, filterParam } = prepareData(sourceMovies);
		setMovies( paginatedMovies );
		setFilterParam( filterParam );
	}

    return (
        <div>
            <div className="header">
                <div>Movies Catalogue App</div>
                <hr />

				<Filter genres={genres} onFilter={onFilter} filterParam={filterParamFromQuery}/>

                <div>
                    Search by Title
                    <input type="text" />
                </div>
            </div>

            <div className="content">
                <Pagination
                    WrappedComponent={MovieList}
                    movies={movies}
                />
            </div>

            <div className="pagination" />
            <div className="footer">(c) 2019 by nopefish</div>
        </div>
    );
};
