import * as React from 'react';
import { Layout } from 'antd'
import NavMenu from '../components/shared/NavMenu';
import { Route, Switch } from 'dva/router';
import AdminMenu from '../components/Menu/AdminMenu'
import './Main.less'
const { Header, Footer, Sider, Content } = Layout;

export interface IMainProps {
    newslist?: Array<{ title: string, content: 'string' }>;
};

class Main extends React.Component<IMainProps> {
    public render(): JSX.Element {
        return (
            <Layout>
                <NavMenu/>
                <Sider className="globalNavMenu">
                    <Switch>
                        <Route path="/admin" exact component={AdminMenu} />
                    </Switch>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        );
    };
}
export default Main