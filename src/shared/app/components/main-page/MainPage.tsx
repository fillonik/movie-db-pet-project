import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ROUTES } from '../../../routes';
import { FilterFormContainer } from '../filter-form/FilterForm';
import * as styles from './index.css';

export interface IMainPageProps {

}

export interface IMainPageState {

}

export const MainPageSFC: React.FunctionComponent<RouteComponentProps<{}> & IMainPageProps> = (props) => {
    const onFind = () => {
        props.history.push(ROUTES.FIND);
    };

    return <div className={styles.containerWrapper}>
        <div className={styles.container}>
            <FilterFormContainer onFindHandler={onFind} />
        </div>
    </div>;
};

export const MainPage = withRouter(MainPageSFC);
