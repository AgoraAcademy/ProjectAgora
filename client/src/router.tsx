import * as React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/Login';  
import Main from './routes/Main'; 
import NoMatch from './components/shared/Nomatch'
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";

interface ITheme {
    themeName: any, // 
    accent: any, //
    useFluentDesign: boolean,
}

export default function RouterConfig({ history }) {
    const theme: ITheme = {
        themeName: "dark",
        accent: "#0078D7", 
        useFluentDesign: true 
        // desktopBackgroundImage: "http://127.0.0.1:8092
    }
    return (
        <UWPThemeProvider theme={getTheme(theme)}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/" component={Main} />
                </Switch>
            </Router>
        </UWPThemeProvider>
    );
}