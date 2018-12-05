import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import { connect } from 'dva'

export interface INoMatchProps {
    dispatch: any,
    learnerProfile: object,
    main: object
}

class NoMatch extends React.Component<INoMatchProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <h5 style={{color: 'white', ...theme.typographyStyles.header}}>
                No match
            </h5>
        );
    }
}

function mapStateToProps({main, learnerProfile}) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(NoMatch)