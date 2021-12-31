import React, {} from 'react';
import {
    NavLink,
    useHistory,
} from 'react-router-dom';
import { FormatDate } from '../../config/methods';

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

    function renderHeaderRow() {
        return (
            <div className={'row header-row'}>
                <div className={'col'}>Question</div>
                <div className={'col'}>Answer</div>
                <div className={'col'}>Date</div>
                <div className={'col small col-alt'}></div>
            </div>
        )
    }

    function renderCampaigns(data) {
        return (
            <div>
                {data.map((e, i) => {
                    let mod = ( i % 2 == 0 ) ? 'even' : 'odd';

                    return (
                        <div className={`row ${mod}`} key={i}>
                            <div 
                                className={'col'}
                                onClick={() => viewCampaign(e.id)}
                            >
                                {e.name}
                            </div>
                            <div 
                                className={'col'}
                                onClick={() => viewCampaign(e.id)}
                            >
                                {e.subjectLine}
                            </div>
                            <div 
                                className={'col'}
                                onClick={() => viewCampaign(e.id)}
                            >
                                {FormatDate(e.timestamp.seconds)}
                            </div>
                            <div className={'col small col-alt'}>
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
                { renderHeaderRow() }
                { renderCampaigns(props.data) }
            </div>
        </div>
    )   
}

export default CampaignsView;
