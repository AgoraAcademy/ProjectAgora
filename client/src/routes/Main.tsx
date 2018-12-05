import * as React from 'react';
import { Layout } from 'antd'
import NavMenu from '../components/shared/NavMenu';
import { Route, Switch } from 'dva/router';
import AdminMenu from '../components/Menu/AdminMenu'
import './Main.less'
import LearnerProfile from '../components/Content/LearnerProfile';
import LearnerMenu from '../components/Menu/LearnerMenu';
import NoMatch from '../components/shared/Nomatch'
const { Header, Footer, Sider, Content } = Layout;

export interface IMainProps {
    newslist?: Array<{ title: string, content: 'string' }>;
};

class Main extends React.Component<IMainProps> {
    public render(): JSX.Element {
        return (
            <Layout>
                <NavMenu/>
                <Sider width={360} className="globalNavMenu">
                    <Switch>
                        <Route path="/admin" component={AdminMenu} />
                        <Route path="/learner" component={LearnerMenu} />
                        <Route component={NoMatch}/>
                    </Switch>
                </Sider>
                <Layout>
                    <Content>
                        <Switch>
                            <Route path="/learner" component={LearnerProfile} />
                            <Route component={NoMatch}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    };
}
export default Main