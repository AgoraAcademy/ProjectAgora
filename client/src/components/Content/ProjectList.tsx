import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout;

import { connect } from 'dva'
import ProjectCard from "../Widget/ProjectCard";

export interface IProjectListProps {
    dispatch: any,
    learnerProfile: any,
    main: any
}

class ProjectList extends React.Component<IProjectListProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public generateProjectList = () => {
        const { projectList } = this.props.main
        let list = projectList.map((item, index) => {
            return (
                <ProjectCard
                    key={`ProjectCard_${index}`}
                    name={item.name}
                    id={item.id}
                    createdTime={item.createdTime}
                    createdBy={item.createdBy}
                    relatedCourse={item.relatedCourse}
                />
            )
        })
        if(list.length === 0) {
            list = <div style={{ padding: '7px', textAlign: 'center', fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>暂无数据</div>
        }
        return list
    }
    

    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Header>
                    <p>header</p>
                </Header>
                <Content>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {this.generateProjectList()}
                    </div>
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