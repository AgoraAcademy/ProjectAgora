import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Button } from 'react-uwp'
import { Layout } from 'antd'
import { fetchRequest } from '../../util'
import swal from 'sweetalert';
const { Header, Footer, Sider, Content } = Layout;

import { connect } from 'dva'

export interface IHomeProps {
    dispatch: any,
    learnerProfile: object,
}
/**
 *
 * 主页面，大致计划用于放置一些公告和参考信息等
 * 
 * @class Home
 * @extends {React.Component<IHomeProps>}
 */
class Home extends React.Component<IHomeProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Header>
                    <p>header</p>
                </Header>
                <Content>
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }
}

function mapStateToProps({main, learnerProfile}) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(Home)