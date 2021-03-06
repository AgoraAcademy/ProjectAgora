import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { ProgressRing, Button } from 'react-uwp'
import { Layout, Row, Col } from 'antd'
const { Header, Footer, Sider, Content } = Layout;

import { connect } from 'dva'
import ProjectCard from "../Widget/ProjectCard";
import ProjectInfoDrawer from "../Widget/ProjectInfoDrawer";
import { fetchRequest } from "../../util";

export interface IProjectListProps {
    dispatch: any,
    learnerProfile: any,
    main: any,
    location: any,
    status: string,
    loading: any
}

export interface IProjectListState {
    showDrawer: boolean
}

class ProjectList extends React.Component<IProjectListProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IProjectListState = {
        showDrawer: false
    }
    
    public generateProjectList = () => {
        const { dispatch } = this.props
        const status = this.props.location.search.split('&')[0].substr(8) || ""
        let projectList = [...this.props.main.projectList] || []
        if (localStorage.getItem("isMentor") === "true") {
            projectList = projectList.filter(project => project.projectMentorID.toString() === localStorage.getItem("learnerId"))
            projectList = projectList.filter(project => project.status !== "未提交")
        } else {
            projectList = projectList.filter(project => project.createdByID.toString() === localStorage.getItem("learnerId"))
        }
        if ( status === "ongoing") {
            projectList = projectList.filter(project => project.status === "进行中")
        } else if ( status === "finished" ) {
            projectList = projectList.filter(project => project.status === "已完成")
        } else if ( status === "waitingForApproval") {
            projectList = projectList.filter(project => project.status === "审核中")
        } else if ( status === "notSubmitted") {
            projectList = projectList.filter(project => project.status === "未提交")
        }
        let list = projectList.map((item, index) => {
            return (
                <ProjectCard
                    key={`ProjectCard_${index}`}
                    coverImageURL={item.coverImageURL}
                    name={item.name}
                    id={item.id}
                    createdTime={item.createdTime}
                    createdByID={item.createdByID}
                    createdBy={item.createdBy}
                    relatedCourse={item.relatedCourse}
                    projectMentor={item.projectMentor}
                    status={item.status}
                    showDrawer={() => {
                        dispatch({ type:"projectDetail/loadProject", projectId: item.id})
                        this.setState({showDrawer: true})
                    }}
                    toEdit={() => {
                        dispatch({type: "main/redirect", path:`/project/${item.id}`})
                    }}
                />
            )
        })
        if(list.length === 0) {
            list = [<div key="noData" style={{ padding: '7px', textAlign: 'center', fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>暂无数据</div>]
        }
        return list
    }

    public getHeader = () => {
        const { loading, dispatch } = this.props;
        if (loading.models.main) {
            return (
                <Header>
                    <ProgressRing style={{margin: "10px"}} size={75} dotsNumber={4} />
                </Header>
            )
        } else {
            return (
                <Header>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={18}>
                        </Col>
                        <Col span={4} >
                            <Button 
                                style={{width:"100%", height:"32px", lineHeight: "normal"}}
                                onClick={() => dispatch({type: "main/redirect", path:"/project/create"}) }
                            >
                                创建新项目
                            </Button>
                        </Col>
                    </Row>
                </Header>
                
            )
        }
    }

    public render():JSX.Element {
        const { theme } = this.context;
        const { dispatch } = this.props
        
        return (
            <Layout>
                <Header>
                    {this.getHeader()}
                </Header>
                <Content>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {this.generateProjectList()}
                    </div>
                    <ProjectInfoDrawer
                        onClose={() => this.setState({showDrawer: false})}
                        visible={this.state.showDrawer}
                    />
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }
}

function mapStateToProps({main, learnerProfile, loading}) {
    return { main, learnerProfile, loading }
}

export default connect(mapStateToProps)(ProjectList)