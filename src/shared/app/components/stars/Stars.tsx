import * as React from 'react';
import * as styles from './index.css';

export interface IStarsProps {
    total: number;
    selected: number;
}

export const Stars: React.FunctionComponent<IStarsProps> = (props) => {
    let starsArr: number[] = [];
    let stars = props.total;

    while (stars >= 1) {
        starsArr.push(stars--);
    }

    return <div className={styles.container} title={`${props.selected}`}>{starsArr.map((item, index) =>
        (<span key={index} className={Math.ceil(props.selected) <= index ? styles.star : styles.starYellow} />))}</div>;
};
