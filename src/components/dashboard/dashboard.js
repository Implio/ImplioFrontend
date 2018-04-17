import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../loader';

function renderEmployees(isAdmin) {
    if (!isAdmin) return null;

    return (
        <div className="column">
            <Link to="/employees">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-icon">
                            <i className="far fa-user fa-7x"></i>
                        </div>
                    </div>
                    <div className="card-content">
                        <p className="title">Employee</p>
                        <div className="content">
                            View and Manage employees.
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

const Dashboard = (props) => {
    if(!props.me)
        return <Loader />;

    return (
        <div className="section">
            <div className="columns">
                <div className="column">
                    <Link to="/patients">
                        <div className="card">
                            <div className="card-header inline-block">
                                <div className="card-header-icon">
                                    <i className="fab fa-accessible-icon fa-7x"></i>
                                </div>
                            </div>
                            <div className="card-content">
                                <p className="title">Patients</p>
                                <div className="content">
                                    View patient data.
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                {renderEmployees(props.me.isAdmin)}
                <div className="column">
                    <Link to="/messages">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-header-title">
                                    <i className="far fa-comments fa-7x"></i>
                                </div>
                            </div>
                            <div className="card-content">
                                <p className="title">Messages</p>
                                <div className="content">
                                    Message other employees.
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        me: state.users.me
    }
}

export default connect(mapStateToProps)(Dashboard);