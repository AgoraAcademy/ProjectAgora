import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import { Layout, Row, Col } from 'antd'
import BraftEditor from 'braft-editor'
import RichEditor from '../Widget/RichEditor'
import 'braft-editor/dist/index.css'
import { connect } from 'dva'
const { Header, Footer, Sider, Content } = Layout;

export interface IProjectDetailProps {
    dispatch: any,
    learnerProfile: object,
    projectDetail: { 
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

/**
 * 项目详情
 *
 * @class ProjectDetail
 * @extends {React.Component<IProjectDetailProps>}
 */
class ProjectDetail extends React.Component<IProjectDetailProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    
    public render(): JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Header>
                    <h5 style={{ color: 'white', ...theme.typographyStyles.header }}>
                        ProjectDetail
                    </h5>
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

    public async componentDidMount() {
        // 假设此处从服务端获取html格式的编辑器内容
        const htmlContent = await this.fetchContentJSON()
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        // this.props.dispatch({ type: "projectDetail/setField", name: "", value: htmlContent })
    }

    private handleEditorChange = (editorState) => {
        // this.props.dispatch({ type: "projectDetail/setField", name: "", value: editorState })
    }

    private fetchContentJSON = () => {
        console.log("fetch")
    }

    private submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        // const htmlContent = this.state.editorState.toHTML()
        // const result = await saveEditorContent(htmlContent)
    }

    private generateItem = (projectItems: IProjectItem[]) => {
        return (
            projectItems.map((item: IProjectItem, index: number) => {
                return (
                    <Row key={Math.random()} gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <RichEditor
                                type="Content"
                                field={item.itemContent}
                                index={index}
                            />
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <RichEditor
                                type="Record"
                                field={item.itemRecord}
                                index={index}
                            />
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <RichEditor
                                type="Comment"
                                field={item.itemComment}
                                index={index}
                            />
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