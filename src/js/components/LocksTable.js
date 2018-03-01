import React from "react";
import LocksListElement from "./LocksListElement";
import { connect } from "react-redux";
import {Pagination} from "react-bootstrap";
import {push} from "react-router-redux";
import { queryString } from "query-string";
import {getLocksData} from "../actions/getLocksData";
import { history } from "../configurateStore/history";
import {Button,Modal} from "react-bootstrap";
import {deleteLock} from "../actions/deleteLock";
import AddLock from "./LockSubmit";

class LocksTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showDelLockModal:false,
            currentLock:null
        };
        this.changePage = this.changePage.bind(this);
        this.showDeleteLockModal=this.showDeleteLockModal.bind(this);
        this.delLock=this.delLock.bind(this);
    }
    componentDidMount(){
        this.props.getAllLocksData();
    }
    showDeleteLockModal(id){
        this.setState({
            showDelLockModal:true,
            currentLock:id
        });
    }
    delLock(){
        this.props.deleteThisLock(this.state.currentLock);
        this.setState({showDelLockModal:false});
    }
    renderPages(pages) {
        const result = [];
        for (let number = 1; number <= pages; number++) {
            result.push(<Pagination.Item key={number} active={number === this.props.page} onClick={() => this.changePage(number)}>{number}</Pagination.Item>);
        }
        return result;
    }
    render()
    {
        const per_page = 5;
        const pages = Math.ceil(this.props.locks.length / per_page);
        const current_page = this.props.page;
        const start_offset = (current_page - 1) * per_page;
        let start_count = 0;
        return(
            <div>
                <AddLock/>
                <table className="table table-bordered table-hover table-striped">
                    <thead>
                        <tr>
                            <th colSpan="3">Locks</th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.locks.map((lock, index) => {
                            if (index >= start_offset && start_count < per_page) {
                                start_count ++;
                                return(
                                    <LocksListElement key={lock.id} lock={lock} deleteLock={this.showDeleteLockModal}/>
                                );
                            }
                        })}
                    </tbody>
                </table>
                <Pagination className="locks-pagination pull-right" bsSize="medium">
                    {this.renderPages(pages)}
                </Pagination>

                <Modal show={this.state.showDelLockModal}>
                    <Modal.Header>
                        <Modal.Title>Confirm action</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Do you really want to delete this lock?</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={()=>{this.setState({showDelLockModal:false});}}>Close</Button>
                        <Button bsStyle="danger" onClick={this.delLock}>Delete</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }

    changePage(pagen)
    {
        const queryString = require("query-string");
        const parsed = queryString.parse(this.props.location.search);
        if(parsed.employeesPage === undefined && parsed.locksPage === undefined)
            history.push("/dashboard/?locksPage=" + pagen);
        else if(parsed.employeesPage !== undefined && parsed.locksPage === undefined)
            history.push(this.props.location.pathname + this.props.location.search + "&locksPage=" + pagen);
        else if(parsed.locksPage !== undefined){
            parsed.locksPage = pagen;
            const searchString = queryString.stringify(parsed);
            history.push("/dashboard/?" + searchString);
        }
    }
}

function mapStateToProps(state){
    const queryString = require("query-string");
    const parsed = queryString.parse(state.routing.location.search);
    return({
        locks: state.locks.data,
        page: Number(parsed.locksPage) || 1,
        location: state.routing.location
    });
}

function mapDispatchToProps(dispatch){
    return {
        getAllLocksData(){
            dispatch(getLocksData());
        },
        deleteThisLock(id){
            dispatch(deleteLock(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocksTable);