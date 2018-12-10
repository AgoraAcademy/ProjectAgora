import dva from 'dva';
import createhistory from 'history/createBrowserHistory';
import main from './models/main';
import learnerProfile from './models/learnerProfile';
import projectDetail from './models/projectDetail';

declare function require(path: string): any;

const app = dva({
    history: createhistory(),
});

app.router(require('./router').default);

app.model(main);
app.model(learnerProfile)
app.model(projectDetail)



app.start('#root');