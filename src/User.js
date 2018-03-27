import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from './store';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.selectedUser ? this.props.selectedUser.name : ''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onChangeName(ev) {
        this.setState({ name: ev.target.value });
    }

    onDelete() {
        this.props.deleteUser({ id: this.props.id });
    }

    onSave(ev) {
        ev.preventDefault();
        const user = { id: this.props.id, name: this.state.name };
        this.props.saveUser(user);
    }

    
    componentWillReceiveProps(nextProps) {
        this.setState({ name: nextProps.selectedUser ? nextProps.selectedUser.name : '' })
    }

    render() {
        const { selectedUser } = this.props;
        const { name } = this.state;
        const { onChangeName, onSave, onDelete } = this;
        if (!selectedUser) {
            return null;
        }
    //    console.log(selectedUser)
        return (
            <div>
                <h1>{ selectedUser.name }</h1>
                <form onSubmit={ onSave }>
                    <input value={ name } onChange={ onChangeName }  />
                    <button>Update</button>
                </form>
                <button onClick={ onDelete }>Delete</button>
            </div>
        );
    }
}

const mapStateToProps = ({users}, { id }) => {
    const user = users.find(user => user.id === id);
    return {
        selectedUser: user
    }
}


/*const mapStateToProps = (state, ownProps) => {
    const users = state.users;
    const id = ownProps.id;
    const user = users.find(user => user.id === id);
    return {
        selectedUser: user
    }
}*/ 
//This chunk of code does same thing as above.
//{users} is from state.users and {id} is ownProps.id that is passed in.

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        saveUser: (user) => dispatch(saveUser(user, history)),
        deleteUser: (user) => dispatch(deleteUser(user, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);