import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from './store';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.selectedUser ? this.props.selectedUser.name : '',
            score: this.props.selectedUser ? this.props.selectedUser.score: ''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeScore= this.onChangeScore.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onChangeName(ev) {
        this.setState({ name: ev.target.value });
    }

    onChangeScore(ev) {
        this.setState({ score: ev.target.value });
    }

    onDelete() {
        this.props.deleteUser({ id: this.props.id });
    }

    onSave(ev) {
        ev.preventDefault();
        const user = { id: this.props.id, name: this.state.name, score: this.state.score };
        this.props.saveUser(user);
    }

    
    componentWillReceiveProps(nextProps) {
        this.setState({ 
            name: nextProps.popularUser ? nextProps.popularUser.name : '',
            score: nextProps.popularUser ? nextProps.popularUser.score : ''
        })
    }

    render() {
        const { popularUser } = this.props;
        const { name, score } = this.state;
        const { onChangeName, onSave, onDelete } = this;
        if (!popularUser) {
            return null;
        }
    //    console.log(popularUser)
        return (
            <div>
                <h1>{ popularUser.name }</h1>
                <form onSubmit={ onSave }>
                    <input value={ name } onChange={ onChangeName }  />
                    <input value={ score } onChange={ onChangeName }  />
                    <button>Update</button>
                </form>
                <button onClick={ onDelete }>Delete</button>
            </div>
        );
    }
}


const mapStateToProps = ({ users }) => {
    const arrScore = users.map(user => user.score); 
    const maxScore = Math.max(...arrScore);
    const user = users.find(user => user.score === maxScore);
    return {
        popularUser: user
    }
}


const mapDispatchToProps = (dispatch, { history }) => {
    return {
        saveUser: (user) => dispatch(saveUser(user, history)),
        deleteUser: (user) => dispatch(deleteUser(user, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popular);