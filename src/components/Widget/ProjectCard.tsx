import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './ProjectCard.less'
import { connect } from "dva";
import { toggleSideBySide, togglePreview } from "simplemde";
import { Card, Row, Col, Popover, Tag, Divider } from "antd";
import { Meta } from "antd/lib/list/Item";
import { Icon } from "react-uwp"
import * as PropTypes from "prop-types";

interface IProjectCardProps {
    name: string,
    id: number,
    createdTime: string,
    createdBy: string,
    relatedCourse: string,
    projectMentor: string,
    status: string,
    showDrawer: () => void
}

interface IProjectCardState {
    popover: boolean
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
            "审核中": "blue"
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
    public render() {
        const { theme } = this.context;
        console.log(theme, "theme")
        const style: React.CSSProperties = {
            fontSize: 24,
            color: "black",
            margin: 5,
            cursor: "default"
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
                                <Col span={10}>
                                    <Icon size={24} {...{ style, hoverStyle }}>Edit</Icon>
                                </Col>
                                <Col span={4}>
                                    <Divider style={{ margin: 5, height: 24}} type="vertical" />
                                </Col>
                                <Col span={10}>
                                    <Icon 
                                        size={24} 
                                        {...{ style, hoverStyle }}
                                        onClick={this.props.showDrawer}
                                    >
                                        Info
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
                            src="asset/ProjectCover-PlaceHolder.png" 
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
                            <Col span={6}>
                                <span>{this.props.name}</span>
                            </Col>
                            <Col style={{textAlign: "right"}} span={6}>
                                <span>{this.props.createdBy}</span>
                            </Col>
                        </Row>
                    }
                    description={
                        <Row type="flex" justify="space-between">
                            <Col span={8}>
                                <span>{this.props.relatedCourse||"自由项目"}</span>
                            </Col>
                            <Col style={{textAlign: "right"}} span={14}>
                                <span>项目导师:{this.props.projectMentor}</span>
                            </Col>
                        </Row>
                    }
                />
            </Card>
        );
    }
}


export default ProjectCard;


