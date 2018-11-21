export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}
function receivePosts(subreddit, json) {
  console.log(json instanceof Array);
  return {
    type: RECEIVE_POSTS,
    subreddit,
    // posts: json.data.map(child => child.data),
    posts: json.data,
    receivedAt: Date.now()
  };
}
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch('http://localhost:3001/users/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}
function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}
