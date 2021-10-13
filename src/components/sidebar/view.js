import React, {} from 'react';


class SidebarView extends React.Component {

    handleClick = (path) => {
        console.log('path: ', path);
        this.props.data.history.push(path);
        this.props.data.toggleSidebar(false);
    }

    render() {
        let { show } = this.props.data;
        if (!show) return null;

        return (
            <>
            <div className={'sidebar-container'}>
                <ul className={'menu-container'}>
                    <li onClick={() => this.handleClick('/')}>
                        Questions
                    </li>
                    <li onClick={() => this.handleClick('/detail')}>
                        Templates
                    </li>
                    <li onClick={() => this.handleClick('/')}>
                        Articles
                    </li>
                    <li onClick={() => this.handleClick('/detail')}>
                        Campaign
                    </li>
                </ul>
            </div>
            </>
        );
    }
}

export default SidebarView;
