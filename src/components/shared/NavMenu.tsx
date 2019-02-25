import * as React from "react";
import * as PropTypes from "prop-types";
import NavigationView from "react-uwp/NavigationView";
import SplitViewCommand from "react-uwp/SplitViewCommand";
import { connect } from 'dva'
import './NavMenu.less'

export interface INavMenuProps {
    dispatch: any,
    main: any
};

/**
 * 全局显示的NavigationMenu
 *
 * @class NavMenu
 * @extends {React.Component<INavMenuProps>}
 */

class NavMenu extends React.Component<INavMenuProps> {
    public static contextTypes = { theme: PropTypes.object };
    public paneStyle = {
        backgroundColor: 'black',
        paddingRight: 10,
    }

    public getNavigationBottomNode = () => {
        let navigationBottomNode = [
            <SplitViewCommand label="注销" icon="Clear" key={Math.random()} onClick={() => {
                localStorage.clear()
                this.props.dispatch({type: "main/redirect", path:"#/login?message=loggedout"})
            }}/>,
            <SplitViewCommand label="用户中心" icon="Contact" key={Math.random()}/>,
            <SplitViewCommand label="设置" icon="Settings" key={Math.random()}/>,
        ]
        if (localStorage.getItem("isAdmin") === "true") {
            navigationBottomNode.unshift(<SplitViewCommand 
                label="管理员入口" 
                icon="Admin" 
                key={Math.random()} 
                onClick={()=> {this.props.dispatch({type:'main/redirect', path:'#/admin'})}}
            />)
        }
        return navigationBottomNode
    }

    public render() {
        const { theme } = this.context;        
        const baseStyle = {
            margin: 0,
            padding: 0,
        };
        const navigationTopNodes = [
            (
                <SplitViewCommand 
                    label="主页" 
                    key={Math.random()} 
                    icon="Home" 
                    onClick={()=> {this.props.dispatch({type:'main/redirect', path:'#/'})}}
                />
            ),
            (
                <SplitViewCommand 
                    label="项目式学习" 
                    icon="Project" 
                    key={Math.random()} 
                    onClick={()=> {this.props.dispatch({type:'main/redirect', path:'#/project'})}}
                />
            ),
            // (
            //     <SplitViewCommand 
            //         label="学时管理" 
            //         key={Math.random()} 
            //         icon="DateTime"
            //         onClick={()=> {this.props.dispatch({type:'main/redirect', path:'#/credithour'})}}
            //     />
            // )
        ];

        const navigationBottomNode = this.getNavigationBottomNode()

        return (
            <div 
                style={{height: '100vh'}}
            >
                <NavigationView
                    className="NavMenu"
                    style={{ ...baseStyle}}
                    pageTitle="安格学院"
                    displayMode="compact"
                    autoResize={false}
                    initWidth={48}
                    expandedWidth={200}
                    defaultExpanded={false}
                    paneStyle={this.paneStyle}
                    navigationTopNodes={navigationTopNodes}
                    navigationBottomNodes={navigationBottomNode}
                    focusNavigationNodeIndex={2}
                />
            </div>
        );
    }
}

function mapStateToProps({main}) {
    return { main }
}

export default connect(mapStateToProps)(NavMenu)