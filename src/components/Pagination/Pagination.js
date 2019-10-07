import React, {useState} from 'react';

import {ReactComponent as PlayButton} from '../../assets/playButton.svg';
import {ReactComponent as PlayNextButton} from '../../assets/playNextButton.svg';

import './styles.css';

export const Pagination = ({movies = [], WrappedComponent}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const pagesCount = movies.length - 1;

  const goForward = () => void setPageNumber(pageNumber + 1);
  const goBackwards = () => void setPageNumber(pageNumber - 1);
  const goToFirst = () => void setPageNumber(0);
  const goToLast = () => void setPageNumber(pagesCount);

  const PageControls = () => {
    return (
      <div className="pagination-controls">
        <PlayNextButton
          className={
            pageNumber <= 0
              ? 'button play-next-button-reverse__inactive'
              : 'button play-next-button-reverse__active'
          }
          disabled={pageNumber <= 0}
          onClick={goToFirst}
        />
        <PlayButton
          className={
            pageNumber <= 0
              ? 'button play-button-reverse__inactive'
              : 'button play-button-reverse__active'
          }
          disabled={pageNumber <= 0}
          onClick={goBackwards}
        />
        <span>
          {pagesCount < 0
            ? 'Loading...'
            : `${pageNumber + 1} of ${pagesCount + 1}`}
        </span>
        <PlayButton
          className={
            pageNumber >= pagesCount
              ? 'button play-button__inactive'
              : 'button play-button__active'
          }
          disabled={pageNumber >= pagesCount}
          onClick={goForward}
        />
        <PlayNextButton
          className={
            pageNumber >= pagesCount
              ? 'button play-next-button__inactive'
              : 'button play-next-button__active'
          }
          disabled={pageNumber >= pagesCount}
          onClick={goToLast}
        />
      </div>
    );
  };

  const moviesData = movies.length > 0 ? movies[pageNumber].moviesData : [];

  return (
    <div>
      <PageControls />
      <WrappedComponent movies={moviesData} />
      <PageControls />
    </div>
  );
};
