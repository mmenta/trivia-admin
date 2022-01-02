import React, {} from 'react';
import {
    NavLink
} from 'react-router-dom';
import { LocalStorageTypes } from '../../config/types';

// redux
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../redux/reducers/map';

class SidebarView extends React.Component {

    doLogout() {
        // remove localstorage
        localStorage.removeItem(LocalStorageTypes.loginStatus);
        // set redux
        this.props.setLoginStatus(false);
    }
    
    render() {
        let { show } = this.props.data;
        let menuState = show ? 
            'sidebar-container active' : 'sidebar-container';

        return (
            <>
            <div className={[menuState]}>
                <ul className={'menu-container'}>
                    <li>
                        <NavLink
                            to={'/'}
                            onClick={() => this.props.data.toggleSidebar(false)}
                        >
                            Questions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/templates'}
                            onClick={() => this.props.data.toggleSidebar(false)}
                        >
                            Templates
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to={'/articles'}
                            onClick={() => this.props.data.toggleSidebar(false)}
                        >
                            Articles
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to={'/campaigns'}
                            onClick={() => this.props.data.toggleSidebar(false)}
                        >
                            Campaigns
                        </NavLink>
                    </li>
                </ul>

                <div 
                    className={'btn-logout'}
                    onClick={() => this.doLogout()}
                >
                    Logout
                </div>
            </div>
            </>
        );
    }
}

// export default SidebarView;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarView);