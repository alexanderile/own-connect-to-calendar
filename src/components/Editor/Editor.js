import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '../Button';
import ErrorNotification from '../ErrorNotification';
import './Editor.styl';
import {getEntry} from '../../services/model/entry-list';
import {postEntry, patchEntry} from '../../services/model/entry-list';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import _ from 'lodash';
import {ConnectImplementation} from '../../connectImplementation';

class Editor extends PureComponent {

    state = {
        user: this.props.user,
        status: this.props.status,
        date: this.props.date,
        startTime: this.props.startTime,
        endTime: this.props.endTime,
        allTime: this.props.allTime,
        description: this.props.description,
        usersList: this.props.usersList,
        statusList: this.props.statusList,
        errNotification: ''
    };

    static defaultProps  = {
        user: '',
        status: '',
        date: null,
        startTime: '',
        endTime: '',
        allTime: false,
        description: ''
    };

    componentDidMount = () => {
        this.idOfEditable = _.get(this, 'props.match.params.id');
        if (this.idOfEditable) {
            getEntry(this.idOfEditable).then(entry => {
                entry.date = moment(entry.date);
                this.setState({...entry});
            })
                .catch(e => {
                    this.props.history.push('/');
                })
        }
    };

    onChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            user: this.state.user,
            status: this.state.status,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            allTime: this.state.allTime,
            description: this.state.description
        };
        const request = this.idOfEditable ? patchEntry : postEntry;

        if (this.idOfEditable) {
            data.id = this.idOfEditable;
        }
        request(data)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(e => {
                this.showErrMsg(e.message);
            })
    };

    showErrMsg = (errNotification) => {
        this.setState({
            errNotification
        }, () => {
            setTimeout(() => {
                this.setState({errNotification: ''});
            }, 5000);
        });
    };

    render() {
        const isTimeError = this.state.startTime && this.state.endTime && this.state.endTime < this.state.startTime;
        const {statuses, users} = this.props;

        return <div className={'Editor'}>
            <div className="Editor__heading">
                <h1>{this.idOfEditable ? 'Edit' : 'New'}</h1>
            </div>
            <form onSubmit={this.onSubmit}>
                <div className="Editor__fields">
                    <div>
                        <label>Choose user</label>
                        <Select
                            placeholder={'Choose user'}
                            searchable={true}
                            clearable={true}
                            onChange={(value) => this.onChange('user', value ? value.value : '')}
                            value={this.state.user}
                            options={users}/>
                    </div>
                    <div>
                        <label>Choose state</label>
                        <Select
                            placeholder={'Choose state'}
                            searchable={true}
                            clearable={true}
                            onChange={(value) => this.onChange('status', value ? value.value : '')}
                            value={this.state.status}
                            options={statuses}/>
                    </div>
                    <div>
                        <label>Choose date</label>
                        <DatePicker
                            selected={this.state.date}
                            className={''}
                            onChange={(value) => this.onChange('date', value)}
                            placeholderText={'Choose date'}/>
                    </div>
                    <div>
                        <label>Choose time</label>
                        <input type="time"
                               className={isTimeError ? 'Editor__time--error' : null}
                               disabled={this.state.allTime}
                               value={this.state.startTime}
                               onChange={({target}) => this.onChange('startTime', target.value)}/>
                        <input type="time"
                               className={isTimeError ? 'Editor__time--error' : null}
                               disabled={this.state.allTime}
                               value={this.state.endTime}
                               onChange={({target}) => this.onChange('endTime', target.value)}/>
                        <input type="checkbox" id={'all'}
                               checked={this.state.allTime}
                               onChange={({target}) => this.onChange('allTime', !this.state.allTime)}/>
                        <label htmlFor="all">All day</label>
                    </div>
                    <div>
                        <label>Hint</label>
                        <textarea className={'Editor__textarea'}
                                  onChange={({target}) => this.onChange('description', target.value || '')}
                                  value={this.state.description}/>
                    </div>
                </div>
                <div className="Editor__buttons">
                    <Button disabled={!!isTimeError} type={'submit'}>Save</Button>
                    <Link to={'/'}><Button>Cancel</Button></Link>
                </div>
            </form>
            <ErrorNotification msg={this.state.errNotification}/>
        </div>;
    }
}

const mapStateToProps = ({users, statuses}) => ({
    statuses,
    users
});

export default connect(
    mapStateToProps
)(Editor);

// export default ConnectImplementation(mapStateToProps)(Editor);