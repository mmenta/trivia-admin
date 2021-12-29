import React, {} from 'react';
import {
    NavLink,
    useHistory,
} from 'react-router-dom';

function CampaignsView(props) {
    const history = useHistory();

    function viewCampaign(id) {
        history.push({
            pathname: '/add-campaign',
            state: {
                id: id,
            }
        });
    }

    function renderCampaigns(data) {
        return (
            <div>
                {data.map((e, i) => {
                    return (
                        <div className={'row'} key={i}>
                            <div className={'col'}>
                                {e.name}
                            </div>
                            <div className={'col'}>
                                {e.subjectLine}
                            </div>
                            <div className={'col'}>
                                {e.templateId}
                            </div>
                            <div className={'col col-alt'}>
                                <div 
                                    className={'button btn-view'}
                                    onClick={() => viewCampaign(e.id)}
                                >
                                    View
                                </div>
                                <div 
                                    className={'button btn-delete'}
                                    onClick={() => props.doDelete(e.id)}
                                >
                                    Delete
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={['campaigns-container content-container']}>
            <div className={'content-inner'}>
                <div className={'action-column'}>
                    <NavLink to={'/add-campaign'}>
                        <div className={['btn-add-new button']}>
                            <div className={'icon-add'}>
                                <span>+</span>
                            </div>
                            <div className={'add-text'}>Add New</div>
                        </div>
                    </NavLink>
                </div>
                <div className={'column-header'}>
                    Campaigns
                </div>
                { renderCampaigns(props.data) }
            </div>
        </div>
    )   
}

export default CampaignsView;
