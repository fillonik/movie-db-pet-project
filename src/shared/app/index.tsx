import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { IStore } from '../../typings';
import { ROUTES } from '../routes';
import { FindPageContainer } from './components/find-page/FindPage';
import { MainPage } from './components/main-page/MainPage';
import * as styles from './index.css';
import { store } from './store/store';

export interface IAppProps<T> {
    store?: T;
    reduxDevtool?<R>(a: R): R;
}

export interface IServerAppProps<T> extends IAppProps<T> {
    url: string;
}

export interface IAppState {

}
export class App extends React.Component<IAppProps<IStore>, IAppState> {
    private store = store({ ...this.props.store }, this.props.reduxDevtool);

    public render() {
        return <Provider store={this.store}>
                <div className={styles.container}>
                    <Switch>
                        <Route exact path={ROUTES.MAIN}>
                            <MainPage/>
                        </Route>
                        <Route exact path={ROUTES.FIND}>
                            <FindPageContainer />
                        </Route>
                    </Switch>
                </div>
        </Provider>;
    }
}

export class ClientApp extends React.Component<IAppProps<IStore>> {
    public render() {
        return (
            <BrowserRouter>
                <App {...this.props} />
            </BrowserRouter>
        );
    }
}

export class ServerApp extends React.Component<IServerAppProps<IStore>> {
    public render() {
        return (
            <StaticRouter context={{}} location={this.props.url}>
                <App {...this.props} />
            </StaticRouter>
        );
    }
}
