import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { ProgressRing, ContentDialog, TextBox, Button, Icon } from 'react-uwp'
import Tabs, { Tab } from "react-uwp/Tabs";
import { Layout, Drawer, Row, Col, Upload } from 'antd'
import { connect } from 'dva'
const { Header, Footer, Sider, Content } = Layout;
import './ProjectInfoDrawer.less'
import PatchUpdateModal from "./PatchUpdateModal";
import { SERVERURL } from "../../../env";
import { fetchRequest } from "../../util";
import swal from 'sweetalert';

export interface IProjectInfoDrawerProps {
    loading: any,
    dispatch: any,
    learnerProfile: any,
    projectDetail: any,
    visible: boolean,
    onClose: () => void,
}

export interface IProjectInfoDrawerState {
    showChildDrawer: boolean,
    patchTarget: string,
    showPatchModal: boolean,
    patchTargetOldValue: any,
    coverImageData: string,
    coverImageURL: string,
    uploadingImage: boolean
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
        showChildDrawer: false,
        showPatchModal: false,
        patchTarget: "",
        patchTargetOldValue: "",
        uploadingImage: false,
        coverImageData: "",
        coverImageURL: "",
    }

    public labelStyle: React.CSSProperties = {
        textAlign: "left",
        margin: "0px"
    };

    public IconRegularStyle: React.CSSProperties = {
        fontSize: 16,
        color: this.context.theme.chromeDisabledLow,
        margin: "0 0 0 5px",
        cursor: "pointer",
        verticalAlign: "inherit"
    };

    public IconHoverStyle: React.CSSProperties = {
        transform: "scale(1.25)",
        color: this.context.theme.accent
    };

    public customUploadRequest = (files) => {
        if (this.props.projectDetail.projectInfo.createdByID.toString() !== window.localStorage.getItem("learnerId")) {
            swal("只有项目创建人可以修改项目封面")
            return
        }
        const { file } = files
        let formData = new FormData()
        formData.append("project_cover", file)

        let headers = {
            'Access-Control-Allow-Origin': '*',
            "Authorization": window.localStorage.getItem("access_token"),
            "refresh_token": window.localStorage.getItem("refresh_token"),
            "openid": window.localStorage.getItem("openid"), //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
        };
        fetch(`${SERVERURL}/v1/utilities/project_cover`, {
            headers,
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(responseData => {
            this.setState({coverImageURL: responseData.url})
        })
        .then(() => {
            const patchBody = {
                coverImageURL: this.state.coverImageURL
            }
            fetchRequest(`/v1/project/${this.props.projectDetail.projectInfo.id}`, "PATCH", patchBody)
        })
        .then(() => {
            fetchRequest(`/v1/utilities/project_cover?learnerId=${this.props.projectDetail.projectInfo.createdByID}&uid=${this.state.coverImageURL}`, "GET")
            .then((data: any) => {
                this.setState({coverImageData: data.projectCover})
            })
        })
    }

    public beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png'
        if (!isJPG && !isPNG) {
            swal("只支持JPEG和PNG格式");
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            swal('上传的图片不可超过10MB! 请压缩文件');
        }
        return (isJPG || isPNG) && isLt10M;
    }

    public generateProjectBasicInfo = () => {
        const { theme } = this.context;
        const { projectInfo } = this.props.projectDetail
        const projectBasicInfo = [
            { label: "项目ID", value: projectInfo.id, editable: false },
            { label: "项目名称", value: projectInfo.name, editable: true },
            { label: "创建人", value: projectInfo.createdBy, editable: false },
            { label: "关联课程", value: projectInfo.relatedCourse, editable: false},
            { label: "项目开始学期", value: projectInfo.projectTerm, editable: true },
            { label: "项目持续学期数", value: projectInfo.projectTermLength, editable: true, unit: "学期" },
            { label: "项目开始时间", value: projectInfo.projectStartDate, editable: true },
            { label: "预期周均学时", value: projectInfo.averageIntendedCreditHourPerWeek, editable: true, unit:"小时" },
            { label: "预期总学时", value: projectInfo.totalIntendedCreditHour, editable: true, unit:"小时" },
            { label: "项目导师", value: projectInfo.projectMentor, editable: true },
            { label: "导师周均指导时间", value: projectInfo.averageGuidingHourPerWeek, editable: true, unit:"小时" },
            { label: "创建时间", value: projectInfo.createdTime, editable: false },
            { label: "上次更新时间", value: projectInfo.lastUpdatedTime, editable: false },
        ]
        return (
            projectBasicInfo.map(
                (item) => {
                    if (typeof (item.value) === "string" || item.value === null) {
                        return (
                            <div key={Math.random()}>
                                <p style={{...theme.typographyStyles.caption, color:'white'}}>{item.label}</p>
                                <p style={{...theme.typographyStyles.subTitle, color: 'white'}}>
                                    {item.value || ""}
                                    <Icon 
                                        style={item.editable? this.IconRegularStyle: {display: "None"}}
                                        hoverStyle={this.IconHoverStyle}
                                        onClick={() => {
                                            this.setState({
                                                showPatchModal: true,
                                                patchTarget: item.label,
                                                patchTargetOldValue: item.value
                                            })
                                        }}
                                        >
                                            Edit
                                    </Icon>
                                </p>
                            </div>
                        )
                    }
                    if (typeof (item.value) === "number") {
                        return (
                            <div key={Math.random()}>
                                <p style={{...theme.typographyStyles.caption, color:'white'}}>{item.label}</p>
                                <p style={{...theme.typographyStyles.subTitle, color: 'white'}}>
                                    {item.value} {item.unit}
                                    <Icon 
                                        style={item.editable? this.IconRegularStyle: {display: "None"}}
                                        hoverStyle={this.IconHoverStyle}
                                        onClick={() => {
                                            this.setState({
                                                showPatchModal: true,
                                                patchTarget: item.label,
                                                patchTargetOldValue: item.value
                                            })
                                        }}
                                        >
                                            Edit
                                    </Icon>
                                </p>
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
            { label: "项目简介", value: projectInfo.projectMeta.projectIntro, editable: true },
            { label: "项目目标", value: projectInfo.projectMeta.projectGoal, editable: true },
            { label: "项目评价标准", value: projectInfo.projectMeta.evaluationSchema, editable: true },
            { label: "项目计划", value: projectInfo.projectMeta.projectPlan, editable: true },
            { label: "项目指导计划", value: projectInfo.projectMeta.instructionPlan, editable: true }
        ]
        return (
            projectMeta.map(
                (item) => {
                    if (typeof (item.value) === "string" || item.value === null) {
                        return (
                            <div key={Math.random()}>
                                <p style={{...theme.typographyStyles.caption, color:'white'}}>{item.label}</p>
                                <p style={{...theme.typographyStyles.subTitle, color: 'white', whiteSpace: "pre-wrap"}}>
                                    {item.value}
                                    <Icon 
                                        style={item.editable ? this.IconRegularStyle: {display: "None"}}
                                        hoverStyle={this.IconHoverStyle}
                                        onClick={() => {
                                            this.setState({
                                                showPatchModal: true,
                                                patchTarget: item.label,
                                                patchTargetOldValue: item.value
                                            })
                                        }}
                                        >
                                            Edit
                                    </Icon>
                                </p>
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
        // const isCommitteeOfAcademics = localStorage.getItem("isCommitteeOfAcademics") === "true"
        const learnerId = localStorage.getItem("learnerId")
        console.log(projectInfo)
        const projectApprovalInfo = [
            // { label: "学术委员会审核结果", value: projectInfo.projectApprovalInfo.approvalCommitteeOfAcademics.result },
            // { label: "学术委员会审核建议", value: projectInfo.projectApprovalInfo.approvalCommitteeOfAcademics.advice },
            { label: "导师审核结果", value: projectInfo.projectApprovalInfo.approvalMentor.result },
            { label: "导师审核建议", value: projectInfo.projectApprovalInfo.approvalMentor.advice },
        ]
        return (
            projectApprovalInfo.map(
                (item) => {
                    if (typeof (item.value) === "string" || item.value === null) {
                        return (
                            <div key={Math.random()}>
                                <p style={{...theme.typographyStyles.caption, color:'white'}}>{item.label}</p>
                                <p style={{...theme.typographyStyles.title, color: 'white', whiteSpace: "pre-wrap"}}>
                                    {item.value}
                                    <Icon 
                                        style={ projectInfo.projectMentorID.toString() === learnerId ? this.IconRegularStyle: {display: "None"}}
                                        hoverStyle={this.IconHoverStyle}
                                        onClick={() => {
                                            this.setState({
                                                showPatchModal: true,
                                                patchTarget: item.label,
                                                patchTargetOldValue: item.value
                                            })
                                        }}
                                    >
                                            Edit
                                    </Icon>
                                </p>
                            </div>
                        )
                    }
                }
            )
        )
    }

    public render(): JSX.Element {
        if (this.props.projectDetail.projectInfo.coverImageURL && this.props.projectDetail.projectInfo.coverImageURL != null && this.state.coverImageData == "") {
            fetchRequest(`/v1/utilities/project_cover?learnerId=${this.props.projectDetail.projectInfo.createdByID}&uid=${this.props.projectDetail.projectInfo.coverImageURL}`, "GET")
                .then((data: any) => {
                    this.setState({ coverImageData: data.projectCover })
            })
        }
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        const baseStyle: React.CSSProperties = {
            display: "block",
            margin: "10px 0",
            height: 400
        };
        const uploadButton = (
            <div>
                {this.state.uploadingImage === true ? <ProgressRing size={50}/> : (<Icon size={24}>Add</Icon>) }
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        const isMentor = localStorage.getItem("isMentor") === "true"
        // const isCommitteeOfAcademics = localStorage.getItem("isCommitteeOfAcademics") === "true"
        if (this.props.loading.models.projectDetail) {
            return (
            <Drawer
                title={<span style={theme.typographyStyles.title}>项目信息</span>}
                width={520}
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                style={{ borderRadius: '0', padding: '0px 10px' }}
            >
                <ProgressRing style={{margin: "10px"}} size={75} dotsNumber={4} />
            </Drawer>
            )
        }
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
                    tabStyle={{ padding: "5px 5px", height: "auto" }}
                >
                    <Tab title="基本信息">
                        <p style={{...theme.typographyStyles.caption, color:'white'}}>项目封面图</p>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            customRequest={this.customUploadRequest}
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                        >
                            {(this.state.coverImageData && this.props.projectDetail.projectInfo.coverImageURL) ? <img style={{ maxWidth: "298px" }} src={"data:img/jpg;base64," + this.state.coverImageData} alt="avatar" /> : uploadButton}
                        </Upload>
                        {this.generateProjectBasicInfo()}
                    </Tab>
                    <Tab title="项目详情">
                        {this.generateProjectMeta()}
                    </Tab>
                    <Tab title="项目审核">
                        {this.generateApprovalInfo()}
                    </Tab>
                </Tabs>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: 'black',
                        textAlign: 'right',
                    }}
                >
                    {/* <Button 
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
                    </Button> */}
                </div>
                <PatchUpdateModal
                    projectID={this.props.projectDetail.projectInfo.id}
                    setState={this.setState}
                    closeModal={()=> this.setState({showPatchModal: false})}
                    visible={this.state.showPatchModal}
                    patchTarget={this.state.patchTarget}
                    patchTargetOldValue={this.state.patchTargetOldValue}
                />
            </Drawer>
        );
    }
}

function mapStateToProps({main, projectDetail, loading}) {
    return { main, projectDetail, loading }
}

export default connect(mapStateToProps)(ProjectInfoDrawer)