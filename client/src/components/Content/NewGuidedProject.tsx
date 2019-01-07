import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP , { Toggle, Button } from 'react-uwp'
import { Layout, Row, Col, Card } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

import { connect } from 'dva'

export interface INewGuidedProjectProps {
    dispatch: any,
    learnerProfile: object,
    editMode: boolean
}
/**
 *
 * 创建新的引导项目
 * 
 * @class NewGuidedProject
 * @extends {React.Component<INewGuidedProjectProps>}
 */
class NewGuidedProject extends React.Component<INewGuidedProjectProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Header style={{height:"48px", marginBottom:"20px", padding:"0px"}}>
                <Row type="flex" justify="space-around" align="middle">
                        <Col span={18}>
                            <span style={{color: 'white', ...theme.typographyStyles.header }}>
                                创建新的引导项目
                            </span>
                        </Col>
                        <Col span={2} >
                            <span>placeholder</span>
                        </Col>
                        <Col span={2}>
                            <span>placeholder</span>
                        </Col>
                        <Col span={1} >
                            <span>placeholder</span>
                        </Col>
                    </Row>
                </Header>
                <Content style={{display: "flex", top: "74px", bottom: "0px", width: "auto"}}>
                    <Row type="flex" justify="space-around" align="middle" style={{width: "-webkit-fill-available"}}> 
                    {/* 此处的width可能有兼容性问题 */}
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: "80%" }}
                                cover={<img alt="example" src="" />}
                            >
                                <Meta
                                    title="自由项目"
                                    description="www.instagram.com"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: "80%" }}
                                cover={<img alt="example" src="" />}
                            >
                                <Meta
                                    title="引导项目"
                                    description="www.instagram.com"
                                />
                            </Card>
                        </Col>
                    </Row>
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

export default connect(mapStateToProps)(NewGuidedProject)