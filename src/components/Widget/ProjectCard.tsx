import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './MDEditor.less'
import { connect } from "dva";
import { toggleSideBySide, togglePreview } from "simplemde";
import { Card, Icon } from "antd";
import { Meta } from "antd/lib/list/Item";

interface IProjectCardProps {
    name: string,
    id: number,
    createdTime: string,
    createdBy: string,
    relatedCourse: string
}
/**
 *
 *
 * @class ProjectCard
 * @extends {Component<IProjectCardProps>}
 */


class ProjectCard extends Component<IProjectCardProps> {


    public render() {
        return (
            <Card
                hoverable
                style={{ width: 300, margin: 20 }}
                cover={<img alt="example" src="asset/ProjectCover-PlaceHolder.png" />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
            >
                <Meta
                    title={this.props.name}
                    // description={
                    //     <div>
                    //         <div>{this.props.createdBy}</div>
                    //         <div>{this.props.relatedCourse}</div>
                    //     </div>
                    // }
                />
            </Card>
        );
    }
}


export default ProjectCard;


