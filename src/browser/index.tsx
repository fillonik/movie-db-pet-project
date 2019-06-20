import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ClientApp } from '../shared/app';
import { IWindow } from '../typings';

const reduxDevtool = (window as IWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = (window as IWindow).__store__;

ReactDOM.hydrate(<ClientApp store={store} reduxDevtool={reduxDevtool}/>, document.getElementById('app'));
