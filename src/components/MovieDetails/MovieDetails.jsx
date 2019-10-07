import React, {useEffect, useRef} from 'react';

import {fetchMovie} from '../../apis';

const MovieDetails = ({match}) => {
  const {id} = match.params;
  const movie = useRef();

  useEffect(() => {
    fetchMovie(id).then(movieData => {
      movie.current = movieData;
      console.log(movie.current);
    });
  }, [id]);

  return (
    <div>
      Hello from MovieDetails!
      <div>ID = {id}</div>
      <div>
        movie = <pre>{JSON.stringify(movie.current)}</pre>
        <div>{movie.current && movie.current.title}</div>
      </div>
    </div>
  );
};

export {MovieDetails};
