import React from 'react';
import { Layout } from 'antd'
import NavMenu from '../components/shared/NavMenu';
import { Route, Switch } from 'dva/router';
import AdminMenu from '../components/Menu/AdminMenu'
import LearnerProfile from '../components/Content/LearnerProfile';
import LearnerMenu from '../components/Menu/LearnerMenu';
import NoMatch from '../components/shared/Nomatch'
import Home from '../components/Content/Home'
import HomeMenu from '../components/Menu/HomeMenu'
import ProjectList from '../components/Content/ProjectList'
import ProjectListMenu from '../components/Menu/ProjectListMenu'
import ProjectDetail from '../components/Content/ProjectDetail'
import ProjectDetailMenu from '../components/Menu/ProjectDetailMenu'
import './Main.less'
import NewProject from '../components/Content/NewProject';
import NewFreeStyleProject from '../components/Content/NewFreeStyleProject';
import NewGuidedProject from '../components/Content/NewGuidedProject';
import NewCourse from '../components/Content/NewCourse';
import CreditHourMenu from '../components/Menu/CreditHourMenu';
import NewLearner from '../components/Content/NewLearner';


const { Header, Footer, Sider, Content } = Layout;

export interface IMainProps {
    newslist?: Array<{ title: string, content: 'string' }>;
};
/**
 * 主体View
 * 分为NavMenu（全局导航条），侧栏Sider（二级导航条），内容Content部分
 * @class Main
 * @extends {React.Component<IMainProps>}
 */

class Main extends React.Component<IMainProps> {
    public render(): JSX.Element {
        return (
            <Layout>
                <NavMenu/>
                <Sider width={240} className={"global-sider"} collapsible collapsedWidth={50}>
                    <Switch >
                        <Route exact path="/" component={HomeMenu} />
                        <Route path="/admin" component={AdminMenu} />
                        <Route path="/learner" component={LearnerMenu} />
                        <Route exact path="/project" component={ProjectListMenu}/>
                        <Route exact path="/project/:id" component={ProjectDetailMenu} />
                        <Route exact path="/credithour" component={CreditHourMenu} />
                        <Route component={NoMatch}/>
                    </Switch>
                </Sider>
                <Layout>
                    <Content id='global_content'>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/learner/create" component={NewLearner} />
                            <Route exact path="/learner/:id" component={LearnerProfile} />
                            <Route exact path="/project" component={ProjectList}/>
                            <Route exact path="/project/create" component={NewProject} />
                            <Route exact path="/project/create/freestyle" component={NewFreeStyleProject} />
                            <Route exact path="/project/create/guided" component={NewGuidedProject} />
                            <Route exact path="/project/:id" component={ProjectDetail} />
                            <Route exact path="/course/create" component={NewCourse} />
                            <Route component={NoMatch}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    };
}

export default Main