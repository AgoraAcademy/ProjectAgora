import * as React from 'react';
import { HashRouter, Route, Switch } from 'dva/router';
import Login from './routes/Login';  
import Main from './routes/Main'; 
import NoMatch from './components/shared/Nomatch'
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
// import Test from './routes/Test';
import Oauth from './routes/Oauth';

interface ITheme {
    themeName: any, // 
    accent: any, //
    useFluentDesign: boolean,
}
/**
 * 顶级路由配置文件
 * 包括React-UWP的ThemeProvider
 *
 * @export
 * @param {*} { history }
 * @returns
 */
export default function RouterConfig({ history }) {
    const theme: ITheme = {
        themeName: "dark",
        accent: "#0078D7", 
        useFluentDesign: true 
        // desktopBackgroundImage: "http://127.0.0.1:8092
    }
    return (
        <UWPThemeProvider theme={getTheme(theme)}>
            <HashRouter>
                <Switch>
                    {/* <Route exact path="/test" component={Test} /> */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/oauth2" component={Oauth} />
                    <Route path="/" component={Main} />
                </Switch>
            </HashRouter>
        </UWPThemeProvider>
    );
}