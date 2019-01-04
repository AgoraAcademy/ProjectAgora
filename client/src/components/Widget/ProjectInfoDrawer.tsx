import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { ContentDialog, TextBox, Button } from 'react-uwp'
import Tabs, { Tab } from "react-uwp/Tabs";
import { Layout, Drawer } from 'antd'
import { connect } from 'dva'
const { Header, Footer, Sider, Content } = Layout;
import './ProjectInfoDrawer.less'

export interface IProjectInfoDrawerProps {
    dispatch: any,
    learnerProfile: any,
    projectDetail: any,
    visible: boolean,
    onClose: () => void
}

export interface IProjectInfoDrawerState {
    showChildDrawer: boolean
}

/**
 * 项目信息显示用Drawer组件
 *
 * @class ProjectInforDrawer
 * @extends {React.Component<IProjectInfoDrawerProps>}
 */

class ProjectInfoDrawer extends React.Component<IProjectInfoDrawerProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IProjectInfoDrawerState = {
        showChildDrawer: false
    }

    public generateProjectBasicInfo = () => {
        const { theme } = this.context;
        const { projectInfo } = this.props.projectDetail
        const projectBasicInfo = [
            { label: "项目ID", value: projectInfo.id },
            { label: "项目名称", value: projectInfo.name },
            { label: "创建时间", value: projectInfo.createdTime },
            { label: "创建人ID", value: projectInfo.createdByID },
            { label: "创建人", value: projectInfo.createdBy },
            { label: "关联课程ID", value: projectInfo.relatedCourseID},
            { label: "关联课程", value: projectInfo.relatedCourse},
            { label: "项目开始学期", value: projectInfo.projectTerm },
            { label: "项目持续时间", value: projectInfo.projectTermLength },
            { label: "项目开始时间", value: projectInfo.projectStartDate },
            { label: "预期周均学时", value: projectInfo.averageIntendedCreditHourPerWeek },
            { label: "预期总学时", value: projectInfo.totalIntendedCreditHour },
            // { label: "项目导师", value: projectInfo.projectMentorID },
            { label: "导师周均指导时间", value: projectInfo.averageGuidingHourPerWeek },
        ]
        return (
            projectBasicInfo.map(
                (item) => {
                    if (typeof (item.value) === "string") {
                        return (
                            <div key={Math.random()}>
                                <p style={{...theme.typographyStyles.caption, color:'white'}}>{item.label}</p>
                                <p style={{...theme.typographyStyles.subTitle, color: 'white'}}>{item.value}</p>
                            </div>
                        )
                    }
                }
            )
        )
    }
    public generateProjectMeta = () => {
        const { theme } = this.context;
        const { projectInfo } = this.props.projectDetail
        const projectMeta = [       
            { label: "项目简介", value: projectInfo.projectMeta.projectIntro },
            { label: "项目目标", value: projectInfo.projectMeta.projectGoal },
            { label: "项目评价标准", value: projectInfo.projectMeta.evaluationSchema },
            { label: "项目计划", value: projectInfo.projectMeta.projectPlan },
        ]
        return (
            projectMeta.map(
                (item) => {
                    if (typeof (item.value) === "string") {
                        return (
                            <div key={Math.random()}>
                                <p style={{...theme.typographyStyles.caption, color:'white'}}>{item.label}</p>
                                <p style={{...theme.typographyStyles.subTitle, color: 'white'}}>{item.value}</p>
                            </div>
                        )
                    }
                }
            )
        )
    }
    
    public generateApprovalInfo = () => {
        const { theme } = this.context;
        const { projectInfo } = this.props.projectDetail
        const projectApprovalInfo = [
            { label: "学术委员会审核结果", value: projectInfo.projectApprovalInfo.ApprovalCommitteeOfAcademics.result },
            { label: "学术委员会审核建议", value: projectInfo.projectApprovalInfo.ApprovalCommitteeOfAcademics.advice },
            { label: "导师审核结果", value: projectInfo.projectApprovalInfo.ApprovalMentor.result },
            { label: "导师审核建议", value: projectInfo.projectApprovalInfo.ApprovalMentor.advice },
        ]
        return (
            projectApprovalInfo.map(
                (item) => {
                    if (typeof (item.value) === "string") {
                        return (
                            <div key={Math.random()}>
                                <p style={{...theme.typographyStyles.caption, color:'white'}}>{item.label}</p>
                                <p style={{...theme.typographyStyles.title, color: 'white'}}>{item.value}</p>
                            </div>
                        )
                    }
                }
            )
        )
    }

    public render(): JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        const baseStyle: React.CSSProperties = {
            display: "block",
            margin: "10px 0",
            height: 400
        };
        return (
            <Drawer
                title={<span style={theme.typographyStyles.title}>项目信息</span>}
                width={520}
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                style={{ borderRadius: '0', padding: '0px 10px' }}
            >
                <Tabs 
                    style={{...baseStyle, height: "auto"}}
                    tabTitleStyle={{...theme.typographyStyles.base, width: '50%', textAlign: 'center'}}
                    tabStyle={{padding: "5px 5px", height: "auto"}}
                >
                    <Tab title="基本信息">
                        {this.generateProjectBasicInfo()}
                        {this.generateApprovalInfo()}
                    </Tab>
                    <Tab title="项目详情">
                        {this.generateProjectMeta()}
                    </Tab>
                </Tabs>
                <Button 
                    style={{width:"100%", height:"32px", lineHeight: "normal"}}
                    onClick={() => this.setState({showChildDrawer: true})}
                >
                    Two-level drawer
                </Button>
                <Button 
                    style={{width:"30%", height:"32px", lineHeight: "normal"}}
                    onClick={() => this.setState({showDrawer: false})}
                >
                    Cancel
                </Button>
                <Button 
                    style={{width:"30%", height:"32px", lineHeight: "normal"}}
                    onClick={() => this.setState({showDrawer: false})}
                >
                    Submit
                </Button>
                <Drawer
                    title={<span style={theme.typographyStyles.title}>二级抽屉</span>}
                    width={320}
                    closable={false}
                    onClose={() => this.setState({showChildDrawer: false})}
                    visible={this.state.showChildDrawer}
                >
                    This is two-level drawer
                </Drawer>
            </Drawer>
        );
    }
}

function mapStateToProps({main, projectDetail}) {
    return { main, projectDetail }
}

export default connect(mapStateToProps)(ProjectInfoDrawer)