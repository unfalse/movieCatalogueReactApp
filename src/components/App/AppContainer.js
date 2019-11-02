import { useEffect, useState } from 'react';

import {AppViewer} from './AppViewer';
import { fetchMovies } from '../../apis';

export const AppContainer = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMovies().then(res => {
            setMovies(res.movies);
        });
    }, []);
    return AppViewer(movies);
};