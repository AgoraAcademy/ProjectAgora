import * as React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/Login';  
import Main from './routes/Main'; 
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";


export default function RouterConfig({ history }) {
    const theme: Theme = {
        themeName: "dark", // 这里不知道为什么tslint会报错
        accent: "#0078D7", // 同上
        useFluentDesign: true // 同上
        // desktopBackgroundImage: "http://127.0.0.1:8092
    }
    return (
        <UWPThemeProvider theme={getTheme(theme)}>
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Main} />
                </Switch>
            </Router>
        </UWPThemeProvider>
    );
}