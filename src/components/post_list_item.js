import React from 'react';
import { Link } from 'react-router-dom';

export default function PostListItem(props) {
  const show = `/posts/${props.post.id}`;
  return (
    <div className="card border-light mb-3">
      <Link to={show}>
        <div className="card-header">{props.post.title}</div>
      </Link>
      <div className="card-body">
        <p className="card-text">{props.post.content}</p>
      </div>
    </div>
  );
}