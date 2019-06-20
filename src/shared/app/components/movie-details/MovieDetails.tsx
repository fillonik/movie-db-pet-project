import * as React from 'react';
import { minutesToHours } from '../../../../utils/minutesToHours';
import { IConfiguration } from '../../../api/configurationApi';
import { IGenre } from '../../../api/genresApi';
import { IMovieDetail } from '../../../api/getMovieApi';
import * as styles from './index.css';

export interface IMovieDetailsProps {
    configuration: IConfiguration;
    movie: IMovieDetail;
}

export const MovieDetails: React.FunctionComponent<IMovieDetailsProps> = (props) => {
    const imageConfig = props.configuration.images;
    const movie = props.movie;
    const getYear = (date: string) =>
        date === '' ? date : (new Date(date)).getFullYear();
    const backgroundImage = movie.backdrop_path ?
        `url(${imageConfig.base_url}${imageConfig.backdrop_sizes[1]}${movie.backdrop_path})` : 'none';
    const posterImage = movie.poster_path ?
        `${imageConfig.base_url}${imageConfig.poster_sizes[0]}${movie.poster_path}` : undefined;

    const renderGenres = (genres: IGenre[]) => genres.map(genre => genre.name).join(', ');

    return <div className={styles.containerWrapper} style={{backgroundImage}}>
        <div className={styles.container}>
            <div className={styles.header}>
                {posterImage && <img src={posterImage} />}
                <div className={styles.title}>
                    {movie.title} {movie.release_date !== '' &&
                <span className={styles.year}> ({getYear(movie.release_date)})</span>}
                {movie.original_title !== movie.title && <>
                    <br />
                    <span className={styles.origTitle}>{movie.original_title}</span>
                </>}
                {movie.vote_average !== 0 && <>
                    <br />
                    <span className={styles.origTitle}>Рейтинг: {movie.vote_average}</span>
                </>}
                {movie.release_date !== '' && <>
                    <br />
                    <span className={styles.origTitle}>Релиз: {movie.release_date}</span>
                </>}
                {movie.runtime !== 0 && <>
                    <br />
                    <span className={styles.origTitle}>Продолжительность: {minutesToHours(movie.runtime)}</span>
                </>}
                    {movie.genres && movie.genres.length > 0 && <>
                        <br />
                        <span className={styles.genresList}>Жанр: {renderGenres(movie.genres)}</span>
                    </>}
            </div>
            </div>
            <div className={styles.tagline}>{movie.tagline}</div>
            <div className={styles.description}>{movie.overview}</div>
        </div>
    </div>;
};
