import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteUser } from '../../store/actions/authActions'

class User extends Component {
  handleDelete = (e) => {
    const { uid } = this.props.auth
    this.props.deleteUser(uid)
    this.props.history.push('/')
  }

  render() {
    const { user, profile } = this.props

    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <div className="card">
            { user ?
            <div>
              <div className="card-image">
                { user.img ? 
                <img src={user.img} alt="avatar" />
                : <img src="https://i1.wp.com/blog.dcshow.cc/wp-content/uploads/2018/01/dc-show-cover.jpg?w=945" alt="girl" /> }
                
                <span className="card-title">{ user.firstName } { user.lastName }</span>

                { user && user.email === profile.email ?
                <Link to={'/edit/' + user.id} user={user} className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons">create</i>
                </Link>
                : null }
              </div>
              <div className="card-content">
                <p>@{ user.id }</p>
                <p><a href={'mailto:' + user.email}>{ user.email }</a></p>
                <p><Link to={'/' + user.id + '/posts'}>See { user.firstName } { user.lastName }'s all posts</Link></p>
                { user && user.email === profile.email ?
                <p><Link to='#' onClick={this.handleDelete} className="red-text">
                  Delete account & all data!
                </Link></p>
                : null }
              </div>
            </div>
            :
            <div>
              <div className="card-image">
                <img src="https://i1.wp.com/blog.dcshow.cc/wp-content/uploads/2018/01/dc-show-cover.jpg?w=945" alt="girl" />
              </div>
              <div className="card-content">
                <p>Loading the user...</p>
              </div>
            </div> }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const users = state.firestore.ordered.users
  const user = users ? users[0] : null

  return {
    user: user,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (uid) => dispatch(deleteUser(uid))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    const id = props.match.params.id
    return (
      [
        { collection: 'users', where: ['id', '==', id] }
      ]
    )
  })
)(User)
