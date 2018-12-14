import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Toggle, Button } from 'react-uwp'
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import { deepCopy } from '../../util'
import MDEditor from "../Widget/MDEditor";
import CalendarDatePicker from "react-uwp/CalendarDatePicker";
import "simplemde/dist/simplemde.min.css";
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
    itemStartDate: Date,
    itemEndDate: Date,
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
                <Header style={{height:"48px", marginBottom:"20px", padding:"0px"}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={18}>
                            <span style={{color: 'white', ...theme.typographyStyles.header }}>
                                ProjectDetail
                            </span>
                        </Col>
                        <Col span={2} >
                            <Button style={{width:"100%", height:"32px", lineHeight: "normal"}}>
                                编辑项目信息
                            </Button>
                        </Col>
                        <Col span={2}>
                            <Toggle
                                label="编辑模式"
                                size={20}
                                defaultToggled={editMode}
                                onToggle={(toggleValue)=> dispatch({type:"projectDetail/setField", name: "editMode", value: toggleValue })}
                            />
                        </Col>
                        <Col span={1} >
                            <Button style={{width:"100%", height:"32px", lineHeight: "normal"}}>
                                保存
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    {this.generateItem(this.props.projectDetail.projectItems)}
                    <Row>
                        <Col span={8} />
                        <Col span={8} style={{marginBottom: "20px", marginTop:"20px"}}>
                            <Button 
                                style={{width:"100%", height:"300px", marginLeft:"auto", marginRight:"auto"}} 
                                icon="Add"
                                onClick={() => dispatch({type:"projectDetail/addProjectItem"})}
                            />
                        </Col>
                        <Col span={8}/>
                    </Row>
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }

    private generateItem = (projectItems: IProjectItem[]) => {
        const {dispatch} = this.props
        return (
            projectItems.map((item: IProjectItem, index: number) => {
                return (
                    <Row type={"flex"} justify={"space-around"} key={Math.random()} style={{marginBottom: "20px", marginTop:"20px"}}>
                        <Col span={2}>
                            <Row>
                                <p id={`item_${index}`}>Number {index}</p>
                            </Row>
                            <Row style={{marginBottom: "10px"}}>
                                <p>开始日期</p>
                                <CalendarDatePicker 
                                    width={"100%"} 
                                    placeholder={this.props.projectDetail.projectItems[index].itemStartDate.toDateString()}
                                    onChangeDate={(value)=> dispatch({type:"projectDetail/setItemStartDate", index, value})}
                                />
                            </Row>
                            <Row>
                                <p>结束日期</p>
                                <CalendarDatePicker 
                                    width={"100%"}
                                    placeholder={this.props.projectDetail.projectItems[index].itemEndDate.toDateString()}
                                    onChangeDate={(value)=> dispatch({type:"projectDetail/setItemEndDate", index, value})}
                                />
                            </Row>
                        </Col>
                        <Col span={7}>
                            <MDEditor id={`item_${index}_content`} value="Initial Content" delay={1000} options={{}}/>
                        </Col>
                        <Col span={7}>
                            <MDEditor id={`item_${index}_record`} value="Initial Record" delay={1000} options={{}}/>
                        </Col>
                        <Col span={7}>
                            <MDEditor id={`item_${index}_comment`} value="Initial Comment" delay={1000} options={{}}/>
                        </Col>
                    </Row>
                )
            })
        )
    }
}

function mapStateToProps({ main, learnerProfile, projectDetail }) {
    return { main, learnerProfile, projectDetail }
}

export default connect(mapStateToProps)(ProjectDetail)