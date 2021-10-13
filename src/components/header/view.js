import React, {} from 'react';

class HeaderView extends React.Component {

    toggleMenu = () => {
        this.props.data.toggleSidebar(!this.props.data.show);
    }

    render() {
        let menuState = this.props.data.show ? 
            'menu-btn-container active' : 'menu-btn-container';

        return (
            <>
            <div className={'header-container'}>
                <div className={'logo-main'}>
                    <span className={'logo-text'}>
                        Trivia Admin Logo Goes Here
                    </span>
                    <span className={'logo-sub'}>
                        (Or not, we could just leave this forever)
                    </span>
                </div>
                <div 
                    onClick={this.toggleMenu}
                    className={[menuState]}
                >
                    <span className={'line'}></span>
                    <span className={'line-alt'}></span>
                </div>
            </div>
            </>
        );
    }
}

export default HeaderView;
