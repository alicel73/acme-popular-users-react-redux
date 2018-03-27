import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_USERS = 'SET_USERS';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';
const CREATE_USER = 'CREATE_USER';

const usersReducer = (state = [], action) => {
    switch(action.type) {
        case SET_USERS:
            state = action.users;
            break;
        case UPDATE_USER:
            state = state.map(person => person.id === action.updatedUser.id ? action.updatedUser : person);
            break;
        case DELETE_USER:
            state = state.filter(person => person.id !== action.deletedUser.id);
            break;
        case CREATE_USER:
            state = [...state, action.newUser];
            break;
    }
    return state;
}

const reducer = combineReducers({
    users: usersReducer
});

const loadUsers = () => {
    return (dispatch) => {
        return axios.get('/api/users')
            .then(result => result.data)
            .then(users => dispatch({
                type: SET_USERS,
                users
            }))
    };
};

const deleteUser = (user, history) => {
    return (dispatch) => {
        return axios.delete(`/api/users/${user.id}`)
            .then(result => result.data)
            .then(user => dispatch({
                type: DELETE_USER,
                deletedUser: user
            }))
            .then(() => {
                history.push('/users');
            })
    };
};

const saveUser = (user, history) => {
    if (user.id) {
        return (dispatch) => {
            return axios.put(`/api/users/${user.id}`, user)
                .then(result => result.data)
                .then(user => dispatch({
                    type: UPDATE_USER,
                    updatedUser: user
                }))
                .then(() => {
                    history.push('/users');
                })
        };
    }
    return (dispatch) => {
        return axios.post('/api/users', user)
            .then(result => result.data)
            .then(user => dispatch({
                type: CREATE_USER,
                newUser: user
            }))
            .then(() => {
                history.push('/users');
            })
    };

};

const store = createStore(reducer, applyMiddleware(thunk));

//console.log (store) = {dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, Symbol(observable): ƒ}

export default store;

export { loadUsers, saveUser, deleteUser };
