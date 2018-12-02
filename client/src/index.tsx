import dva from 'dva';
import createhistory from 'history/createBrowserHistory';
import main from './models/main';

declare function require(path: string): any;

const app = dva({
    history: createhistory(),
});

app.router(require('./router').default);

app.model(main)

app.start('#root');