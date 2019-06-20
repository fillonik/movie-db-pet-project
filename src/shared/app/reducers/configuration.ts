import { IStore } from '../../../typings';
import { IConfiguration } from '../../api/configurationApi';

export function ConfigurationReducer(configuration: IConfiguration | null = null) {
    return configuration;
}

export function configurationSelector(store: IStore): IConfiguration {
    return store.configuration;
}
