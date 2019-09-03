import React, { useState } from "react";

import './styles.css';

export const Pagination = ({
    movies = [],
    WrappedComponent
}) => {
    const [pageNumber, setPageNumber] = useState(0);
	const pagesCount = movies.length - 1;

	const goForward = () => void setPageNumber(pageNumber + 1);
	const goBackwards = () => void setPageNumber(pageNumber - 1);
	const goToFirst = () => void setPageNumber(0);
	const goToLast = () => void setPageNumber(pagesCount);
	const PageControls = () => {
		return (
			<div>
				{pageNumber <= 0 ? <span className="button inactive">{"|<"}</span> :
					<span onClick={goToFirst} className="button active">{"|<"}</span>}
				{pageNumber <= 0 ? <span className="button inactive">{"<"}</span> :
					<span onClick={goBackwards} className="button active">{"<"}</span>}
				{<span className="button">{pageNumber + 1}</span>}
				{pageNumber >= pagesCount ? <span className="button inactive">{">"}</span> :
					<span onClick={goForward} className="button active">{">"}</span>}
				{pageNumber >= pagesCount ? <span className="button inactive">{">|"}</span> :
					<span onClick={goToLast} className="button active">{">|"}</span>}
			</div>
		);
	};

	const moviesData = movies.length > 0 ? movies[pageNumber].moviesData : [];

	return (
        <div>
            <div className="pagination">
                <PageControls />
            </div>
			<WrappedComponent movies={moviesData} />
            <div className="pagination">
                <PageControls />
            </div>
        </div>
    );
};
