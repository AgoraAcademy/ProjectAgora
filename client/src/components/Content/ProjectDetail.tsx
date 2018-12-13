import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Toggle, Button } from 'react-uwp'
import { Layout, Row, Col } from 'antd'
import RichEditor from '../Widget/RichEditor'
import { connect } from 'dva'
import { deepCopy } from '../../util'
const { Header, Footer, Sider, Content } = Layout;


export interface IProjectDetailProps {
    dispatch: any,
    learnerProfile: object,
    projectDetail: { 
        editMode: boolean,
        projectInfo: object,
        projectItems: IProjectItem[]
    }
}
/**
 * 项目条目
 *
 * @interface IProjectItem
 */
interface IProjectItem {
    itemTitle: string,
    itemStartDate: string,
    itemEndDate: string,
    itemContent: object,
    itemRecord: object,
    itemComment: object
}

interface IProjectDetailState {
    dirty: boolean
}
/**
 * 项目详情
 *
 * @class ProjectDetail
 * @extends {React.Component<IProjectDetailProps>}
 */


class ProjectDetail extends React.Component<IProjectDetailProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IProjectDetailState = {
        dirty: false
    }  
    public render(): JSX.Element {
        const { theme } = this.context;
        const { learnerProfile, projectDetail, dispatch } = this.props;
        const { editMode } = projectDetail
        return (
            <Layout>
                <Header style={{height:"48px", marginBottom:"20px"}}>
                    <Row type="flex" justify="center" align="middle">
                        <Col span={20}>
                            <span style={{color: 'white', ...theme.typographyStyles.header }}>
                                ProjectDetail
                            </span>
                        </Col>
                        <Col span={2}>
                            <Toggle
                                label="编辑模式"
                                size={18}
                                defaultToggled={editMode}
                                onToggle={(toggleValue)=> dispatch({type:"projectDetail/setField", name: "editMode", value: toggleValue })}
                            />
                        </Col>
                        <Col span={2}>
                            <Button>
                                保存
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    {this.generateItem(this.props.projectDetail.projectItems)}
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }

    private generateItem = (projectItems: IProjectItem[]) => {
        return (
            projectItems.map((item: IProjectItem, index: number) => {
                return (
                    <div key={Math.random()}>
                        <Col span={2}>
                            <span id={`item_${index}`}>Number {index}</span>
                        </Col>
                        <Col span={22}>
                            <RichEditor
                                key={Math.random()}
                                index={index}
                                options={{
                                    spellChecker: false
                                }}
                            />
                        </Col>
                    </div>
                )
            })
        )
    }
}

function mapStateToProps({ main, learnerProfile, projectDetail }) {
    return { main, learnerProfile, projectDetail }
}

export default connect(mapStateToProps)(ProjectDetail)