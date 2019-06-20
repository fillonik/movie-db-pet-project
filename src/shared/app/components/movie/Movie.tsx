import * as React from 'react';
import { IMovie } from '../../../api/searchMovieApi';
import { Stars } from '../stars/Stars';
import * as styles from './index.css';

export interface IMovieProps {
    movie: IMovie;
    selectedMovie?: number;
    onMovieClick(movieId: number): void;
}

export const Movie: React.FunctionComponent<IMovieProps> = (props) => {
    const movie = props.movie;
    const getYear = (date: string) =>
        date === '' ? date : (new Date(date)).getFullYear();
    const containerClass = `${styles.container} ${movie.id === props.selectedMovie ?
        styles.selected :
        undefined}`;

    return <div className={containerClass} onClick={() => props.onMovieClick(movie.id)}>
        <div className={styles.header}>
            <div className={styles.title}>{movie.title}
                {movie.release_date !== '' &&
                <span className={styles.year}> ({getYear(movie.release_date)})</span>}
                <br />
                <span className={styles.origTitle}>{movie.original_title}</span>
            </div>
            <div className={styles.rating}><Stars total={10} selected={movie.vote_average}/></div>
        </div>
        <div className={styles.description}>
            {movie.overview}
        </div>
    </div>;
};
