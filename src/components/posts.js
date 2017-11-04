import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import PostListItem from './post_list_item';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Posts extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    if (this.props.posts) {
      const postListItems = _.map(this.props.posts, post => {
        return <PostListItem post={post} key={post.id} />;
      });

      return(
        <div>
          <h1 className="posts-title">Posts</h1>
          <div className="new-posts-link">
            <Link to="/posts/new">
              <h3>Create a new post</h3>
            </Link>
          </div>
          <br />
          <div>
            {postListItems}
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { fetchPosts })(Posts);