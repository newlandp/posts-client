import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostsShow extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.post.id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    if(!this.props.post) {
      return <div>Loading...</div>;
    }

    const editLink = `/posts/${this.props.post.id}/edit`

    return(
      <div>
        <div>
          {this.props.post.title}
        </div>
        <div>
          {this.props.post.content}
        </div>
        <div>
          <Link to="/">
            Back
          </Link>
        </div>
        <div>
          <button onClick={this.onDeleteClick}>Delete this post</button>
        </div>
        <div>
          <Link to={editLink}>
            Update Post
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);