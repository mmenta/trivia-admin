import React, {} from 'react';
import {
    NavLink
} from 'react-router-dom';

class SidebarView extends React.Component {
    
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
            </div>
            </>
        );
    }
}

export default SidebarView;
