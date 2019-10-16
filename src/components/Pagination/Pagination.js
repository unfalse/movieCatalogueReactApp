import React from 'react';

import {ReactComponent as PlayButton} from '../../assets/playButton.svg';
import {ReactComponent as PlayNextButton} from '../../assets/playNextButton.svg';

import './styles.css';

export const Pagination = ({
  movies = [],
  WrappedComponent,
  history,
  pageNum = 1,
}) => {
  const pagesCount = movies.length;

  const gotoPage = pageNumber => void history.push(`/page/${pageNumber}`);

  const goForward = () => void gotoPage(pageNum + 1);
  const goBackwards = () => void gotoPage(pageNum - 1);
  const goToFirst = () => void gotoPage(1);
  const goToLast = () => void gotoPage(pagesCount);

  const PageControls = () => {
    return (
      <div className="pagination-controls">
        <PlayNextButton
          className={
            pageNum - 1 <= 0
              ? 'button play-next-button-reverse__inactive'
              : 'button play-next-button-reverse__active'
          }
          disabled={pageNum - 1 <= 0}
          onClick={goToFirst}
        />
        <PlayButton
          className={
            pageNum - 1 <= 0
              ? 'button play-button-reverse__inactive'
              : 'button play-button-reverse__active'
          }
          disabled={pageNum - 1 <= 0}
          onClick={goBackwards}
        />
        <span>
          {pagesCount < 0 ? 'Loading...' : `${pageNum} of ${pagesCount + 1}`}
        </span>
        <PlayButton
          className={
            pageNum - 1 >= pagesCount
              ? 'button play-button__inactive'
              : 'button play-button__active'
          }
          disabled={pageNum - 1 >= pagesCount}
          onClick={goForward}
        />
        <PlayNextButton
          className={
            pageNum - 1 >= pagesCount
              ? 'button play-next-button__inactive'
              : 'button play-next-button__active'
          }
          disabled={pageNum - 1 >= pagesCount}
          onClick={goToLast}
        />
      </div>
    );
  };

  const moviesData =
    movies.length > 0 && pageNum - 1 >= 0 ? movies[pageNum - 1].moviesData : [];

  return (
    <div>
      <PageControls />
      <WrappedComponent movies={moviesData} />
      <PageControls />
    </div>
  );
};
