import dva from 'dva';
import createhistory from 'history/createBrowserHistory';
import main from './models/main';
import learnerProfile from './models/learnerProfile';
import projectDetail from './models/projectDetail';
import course from './models/course';
import createLoading from 'dva-loading';
import booking from './models/booking';

declare function require(path: string): any;

const app = dva({
    history: createhistory(),
});

app.router(require('./router').default);
app.use(createLoading())
app.model(main);
app.model(learnerProfile)
app.model(projectDetail)
app.model(course)
app.model(booking)



app.start('#root');