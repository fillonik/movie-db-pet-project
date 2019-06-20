import * as React from 'react';
import { IMovie } from '../../../api/searchMovieApi';
import { Movie } from '../movie/Movie';
import * as styles from './index.css';

export interface IMovieListProps {
    movies: IMovie[];
    selectedMovie?: number;
    onMovieClick(movieId: number): void;
}

export const MovieList: React.FunctionComponent<IMovieListProps> = (props) =>
    <div className={styles.container}>
        {props.movies.map( movie =>
            <Movie selectedMovie={props.selectedMovie}
                   onMovieClick={props.onMovieClick}
                   movie={movie}
                   key={movie.id} />)}
    </div>;
