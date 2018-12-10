import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout;

import { connect } from 'dva'

export interface IProjectListProps {
    dispatch: any,
    learnerProfile: object,
}

class ProjectList extends React.Component<IProjectListProps> {
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
                    <h5 style={{color: 'white', ...theme.typographyStyles.header}}>
                        ProjectList
                    </h5>
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

export default connect(mapStateToProps)(ProjectList)