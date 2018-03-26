import React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";


class LocksListElement extends React.Component{
    render()
    {
        const lock=this.props.lock;
        return(
            <tr key={lock.id}>
                <td className="id-column"><Link to={"/lock/"+lock.id}>#{lock.id}</Link></td>
                <td><Link to={"/lock/"+lock.id}>{lock.lock_name}</Link></td>
                <td className="actions-column">
                    <Button type="button" onClick={this.props.deleteLock.bind(this,lock.id)} bsSize="small" bsStyle="danger">Delete</Button>
                    <Button type="button" bsSize="small" bsStyle="warning">Update</Button>
                    <Button type="button" bsSize="small" bsStyle="primary" onClick={this.props.getLockConfig.bind(this,lock.id)}>&#9881;</Button>
                </td>
            </tr>
        );
    }
}

export default LocksListElement;