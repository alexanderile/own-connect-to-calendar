import React, {PureComponent} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Pagination from '../Pagination';
import Button from '../Button';
import _ from 'lodash';
import {getEntries, removeEntry} from '../../services/model/entry-list';
import './List.styl';
import moment from 'moment';

class List extends PureComponent {

    constructor(props) {
        super(props);
        this.getData(props);
    }

    state = {
        list: []
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps !== this.props) {
            this.getData(newProps);
        }
    };

    getData = (props = this.props) => {
        getEntries(_.get(props, 'match.params.page', 1), props.filters)
            .then(list => {
                this.setState({list});
            });
    };

    sortArr = (el, nextEl) => {
        const mEl = moment(el.date).format('X').padStart(10, 0);
        const mNextEl = moment(nextEl.date).format('X').padStart(10, 0);

        return mEl > mNextEl;
    };

    filterArr = () => {
        return true;
    };

    render() {
        const {statuses} = this.props;

        return <div className="List">
            <div className={'List__wrapper'}>
                {(this.state.list || []).sort(this.sortArr).filter(this.filterArr).map((listElement, i, arr) => {
                    return <div className="List__element" key={listElement.id}>
                        {listElement.date !== _.get(arr, `${i - 1}.date`) &&
                        <div className="Element__title">
                            {_.capitalize(moment(listElement.date).format('dddd, DD MMMM YYYY'))}
                        </div>
                        }
                        <div className="Element__panel">
                            <div>
                                <span>{(statuses.find(s => s.value === listElement.status) || {}).label}</span>
                                {' - '}
                                {listElement.allTime ?
                                    <span>All day</span> :
                                    <span>{moment(moment(listElement.endTime, 'HH:mm')
                                        .diff(moment(listElement.startTime, 'HH:mm')))
                                        .format('H [h.] mm [m.]')}
                                    </span>
                                }
                            </div>
                            <div>
                                <Link to={`/editor/${listElement.id}`}><Button>Edit</Button></Link>
                                <Button onClick={() =>
                                    {removeEntry(listElement.id).then(list => this.setState({list}))}}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>;
                })}
                {!_.get(this, 'state.list.length') &&
                <div>List is empty</div>
                }
            </div>
            <Pagination page={_.get(this, 'props.match.params.page', 1)}/>
        </div>;
    }
}

const mapStateToProps = ({filters, users, statuses}) => ({
    filters,
    users,
    statuses
});

export default withRouter(connect(
    mapStateToProps
)(List));
