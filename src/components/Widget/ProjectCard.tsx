import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './ProjectCard.less'
import { connect } from "dva";
import { toggleSideBySide, togglePreview } from "simplemde";
import { Card, Row, Col, Popover, Tag, Divider } from "antd";
import { Meta } from "antd/lib/list/Item";
import { Icon } from "react-uwp"
import * as PropTypes from "prop-types";
import { fetchRequest } from "../../util";

interface IProjectCardProps {
    dispatch: any,
    name: string,
    id: number,
    createdTime: string,
    createdBy: string,
    createdByID: number,
    relatedCourse: string,
    projectMentor: string,
    status: string,
    coverImageURL: string,
    showDrawer: () => void,
    toEdit: () => void
}

interface IProjectCardState {
    popover: boolean,
    coverImageData?: string
}
/**
 *
 *
 * @class ProjectCard
 * @extends {Component<IProjectCardProps>}
 */


class ProjectCard extends Component<IProjectCardProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IProjectCardState = {
        popover: false
    }

    public getStatusTag = () => {
        const colorMapper = {
            "未提交": "geekblue",
            "审核中": "blue",
            "已通过": "green",
            "进行中": "orange"
        }
        return (
            <Tag color={colorMapper[this.props.status]}>{this.props.status}</Tag>
        )
    }

    public getProjectTag = () => {
        return (
            <Tag color="cyan">ProjectTag</Tag>
        )
    }

    public launchProject = () => {
        const patchBody = {
            status: "进行中"
        }
        fetchRequest(`/v1/project/${this.props.id}`, "PATCH", patchBody)
        .then(() => {
            this.props.dispatch({type: "main/redirect", path:`/project/${this.props.id}`})
        })
        .catch(e => ({ error: e}))
    }
    
    public submitProject = () => {
        const patchBody = {
            status: "审核中"
        }
        fetchRequest(`/v1/project/${this.props.id}`, "PATCH", patchBody)
        .then(() => {
            this.props.dispatch({type: "main/redirect", path:`/project`})
        })
        .catch(e => ({ error: e}))
    }

    public componentDidMount = () => {
        if (this.props.coverImageURL) {
            fetchRequest(`/v1/utilities/project_cover?learnerId=${this.props.createdByID}&uid=${this.props.coverImageURL}`, "GET")
                .then((data: any) => {
                    this.setState({ coverImageData: data.projectCover })
                })
        }
    }

    public render() {
        const { theme } = this.context;
        const { status } = this.props
        const { coverImageData } = this.state 
        const img = coverImageData ? `data:img/jpg;base64,${coverImageData}` : "asset/ProjectCover-PlaceHolder.png"
        const regularStyle: React.CSSProperties = {
            fontSize: 24,
            color: "black",
            margin: 5,
            cursor: "pointer"
        };
        const disabledStyle:React.CSSProperties = {
            fontSize: 24,
            color: theme.chromeDisabledLow,
            margin: 5,
            cursor: "not-allowed"
        };
        const hoverStyle: React.CSSProperties = {
            transform: "scale(1.25)",
            color: theme.accent
        };
        return (
            <Card
                hoverable
                style={{ width: 300, margin: 20 }}
                cover={
                    <Popover 
                        content={
                            <Row style={{width: 180, textAlign: "center"}}>
                                <Col span={6}>
                                    <Icon
                                        size={24}
                                        style={status === "审核中"?disabledStyle: regularStyle}
                                        onClick={() => {
                                            switch (status) {
                                                case "未提交":
                                                    this.submitProject()
                                                    break
                                                case "审核中":
                                                    break
                                                case "已通过":
                                                    this.launchProject()
                                                    break
                                                case "进行中":
                                                    this.props.toEdit()
                                                    break
                                            }
                                        }}
                                        hoverStyle={status === "审核中"? disabledStyle : hoverStyle}
                                    >
                                        {status === "进行中" ? "Edit" : status === "未提交" || status === "未通过" ? "Upload": "Play"}
                                    </Icon>
                                </Col>
                                <Col span={3}>
                                    <Divider style={{ margin: 5, height: 24}} type="vertical" />
                                </Col>
                                <Col span={6}>
                                    <Icon 
                                        size={24} 
                                        style={regularStyle}
                                        hoverStyle={hoverStyle}
                                        onClick={this.props.showDrawer}
                                    >
                                        Info
                                    </Icon>
                                </Col>
                                <Col span={3}>
                                    <Divider style={{ margin: 5, height: 24}} type="vertical" />
                                </Col>
                                <Col span={6}>
                                    <Icon 
                                        size={24} 
                                        style={status === "审核中" || status === "未提交" ?disabledStyle: regularStyle}
                                        hoverStyle={status === "审核中" || status === "未提交" ? disabledStyle : hoverStyle}
                                    >
                                        View
                                    </Icon>
                                </Col>
                            </Row>
                        } 
                        trigger="hover" 
                        visible={this.state.popover}
                        onVisibleChange={(popover) => this.setState({popover})}
                        placement="bottom"
                    >
                        <img 
                            alt="example" 
                            src={img}
                        />
                    </Popover>
                }
            >
                <Row type="flex" justify="space-between" style={{margin: "5px 0 5px 0"}}>
                        <Col span={6}>
                            {this.getStatusTag()}
                        </Col>
                        <Col style={{textAlign: "right"}} span={6}>
                            {this.getProjectTag()}
                        </Col>
                    </Row>
                <Meta
                    title={
                        <Row type="flex" justify="space-between">
                            <Col span={18} style={{color: "black"}}>
                                <span>{this.props.name}</span>
                            </Col>
                            <Col style={{textAlign: "right", color: "black"}} span={6}>
                                <span>{this.props.createdBy}</span>
                            </Col>
                        </Row>
                    }
                    description={
                        <Row type="flex" justify="space-between">
                            <Col span={8} style={{color: "black"}}>
                                <span>{this.props.relatedCourse||"自由项目"}</span>
                            </Col>
                            <Col style={{textAlign: "right", color: "black"}} span={14}>
                                <span>项目导师:{this.props.projectMentor}</span>
                            </Col>
                        </Row>
                    }
                />
            </Card>
        );
    }
}

function mapStateToProps({main}) {
    return {main}
}

export default connect(mapStateToProps)(ProjectCard);


