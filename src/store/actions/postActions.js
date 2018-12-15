export const addPost = (post) => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore()
    const profile = getState().firebase.profile
    const authorUid = getState().firebase.auth.uid

    db.collection('posts').add({
      ...post,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: profile.id, 
      authorUid: authorUid,
      createdAt: new Date()
    })
    .then(dispatch({ type: 'ADD_POST', post }))
    .catch(err => dispatch({ type: 'ADD_POST_ERROR', err }))
  }
}

export const updatePost = (post) => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore()

    db.collection('posts').doc(post.postId).update({
      title: post.title,
      content: post.content,
      editedAt: new Date()
    })
    .then(dispatch({ type: 'UPDATE_POST', post }))
    .catch(err => dispatch({ type: 'UPDATE_POST_ERROR', err }))
  }
}

export const deletePost = (postId) => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore()

    db.collection('posts').doc(postId).delete()
    .then(dispatch({ type: 'DELETE_POST', postId }))
    .catch(err => dispatch({ type: 'DELETE_POST_ERROR', err }))
  }
}
