import { Primary } from './primary.model';

export const primaryProvider = {
    provide: 'PRIMARY_REPOSITORY',
    useValue: Primary,
}