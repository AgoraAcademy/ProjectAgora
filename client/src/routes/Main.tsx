import * as React from 'react';
import { Layout } from 'antd'
import NavMenu from '../components/shared/NavMenu';
import { Route, Switch } from 'dva/router';
import AdminMenu from '../components/Menu/AdminMenu'
import './Main.less'
import LearnerProfile from '../components/Content/LearnerProfile';
import LearnerMenu from '../components/Menu/LearnerMenu';
import NoMatch from '../components/shared/Nomatch'
import Home from '../components/Content/Home'
import HomeMenu from '../components/Menu/HomeMenu'
import ProjectList from '../components/Content/ProjectList'
import ProjectListMenu from '../components/Menu/ProjectListMenu'
import ProjectDetail from '../components/Content/ProjectDetail'
import ProjectDetailMenu from '../components/Menu/ProjectDetailMenu'


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
                        <Route exact path="/" component={HomeMenu} />
                        <Route path="/admin" component={AdminMenu} />
                        <Route path="/learner" component={LearnerMenu} />
                        <Route exact path="/project" component={ProjectListMenu}/>
                        <Route exact path="/project/:id" component={ProjectDetailMenu} />
                        <Route component={NoMatch}/>
                    </Switch>
                </Sider>
                <Layout>
                    <Content>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/learner" component={LearnerProfile} />
                            <Route exact path="/project" component={ProjectList}/>
                            <Route exact path="/project/:id" component={ProjectDetail} />
                            <Route component={NoMatch}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    };
}
export default Main