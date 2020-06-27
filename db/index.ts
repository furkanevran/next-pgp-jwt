import * as promise from 'bluebird';
import * as dbConfig from './db-config';
import pgPromise from 'pg-promise';
import {IInitOptions, IDatabase, IMain} from 'pg-promise';
import {IExtensions, UserRepository} from './repos';
import * as monitor from 'pg-monitor'

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {
    noWarnings: true,
    promiseLib: promise,

    extend(obj: ExtendedProtocol, dc: any) {
        obj.users = new UserRepository(obj, pgp);
    }
};

if(process.env.NODE_ENV === 'development') {
    if(monitor.isAttached()) monitor.detach()
    monitor.attach(initOptions)
}
const pgp: IMain = pgPromise(initOptions);

//we cast timestamp objects to string
pgp.pg.types.setTypeParser(1114, (timestamp) => {
    return timestamp+''
})

const db: ExtendedProtocol = pgp(dbConfig.default);

export {db, pgp};