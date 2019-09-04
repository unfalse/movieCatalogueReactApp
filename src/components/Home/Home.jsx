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
	console.log(filterParam);
	if (filterParam === 'None') return items;
	items.forEach(item => {
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
	console.log(paginatedMovies);
	return {
		paginatedMovies
	};
}

export const Home = () => {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	useEffect(() => {
		fetchMovies().then(res => {
			console.log(res.movies);
			const { paginatedMovies } = prepareData(res.movies);
			console.log(paginatedMovies);
			const genres = getGenres(res.movies);
			setMovies(paginatedMovies);
			setGenres(genres);
		});
	}, []);

	const onFilter = () => {
		const { paginatedMovies } = prepareData(movies);
		setMovies(paginatedMovies);
	}

    return (
        <div>
            <div className="header">
                <div>Movies Catalogue App</div>
                <hr />

				<Filter genres={genres} onFilter={onFilter}/>

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
