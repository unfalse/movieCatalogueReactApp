import React, { useEffect, useState } from "react";

import { fetchMovies } from "../../apis";
import { MovieList } from "../MovieList";
import { Pagination } from "../Pagination";

const ITEMS_PER_PAGE = 3;

const getQueryParams = () => {

};

// Returns an array of movies chunks divided by pages
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

const setFilter = (items) => {
	return items;
}

const setSearch = (items) => {
	return items;
}

const prepareData = (items) => {
	getQueryParams();
	return preparePagination(items);
}

export const Home = () => {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		fetchMovies().then(res => {
			setMovies( prepareData(res.movies) );
		});
	}, []);

    return (
        <div>
            <div className="header">
                <div>Movies Catalogue App</div>
                <hr />

                <div>
                    Filter by
                    <span>
                        <select>
                            <option value="genre">genre</option>
                        </select>
                        <select>
                            <option value="horror">Horror</option>
                        </select>
                    </span>
                </div>

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
