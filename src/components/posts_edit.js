import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { updatePost, fetchPost } from '../actions/index';

class PostsEdit extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPost(id);
  }

  onFormSubmit(values) {
    const id = this.props.match.params.id;
    this.props.updatePost(id, values, () => {
      this.props.history.push(`/posts/${id}`)
    });
  }

  renderField(field) {
    const reduxFormField = `form-control ${field.meta.touched && field.meta.error ? 'is-invalid' : ''}`;
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className={reduxFormField}
          type={field.type}
          { ...field.input }
        />
        <div className="invalid-feedback">
          { field.meta.touched ? field.meta.error : "" }
        </div>
      </div>
    );
  }

  renderTextarea(field) {
    const reduxFormField = `form-control ${field.meta.touched && field.meta.error ? 'is-invalid' : ''}`;
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <textarea
          rows="10"
          columns="50"
          className={reduxFormField}
          { ...field.input }
        ></textarea>
        <div className="invalid-feedback">
          { field.meta.touched ? field.meta.error : "" }
        </div>
      </div>
    );
  }

  render() {
    if(!this.props.post) {
      return <div>Loading...</div>;
    }

    return(
      <div>
        <h1>Update: {this.props.post.title}</h1>
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Content"
            name="content"
            component={this.renderTextarea}
          />
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "need to include a valid title"
  }

  if(!values.content) {
    errors.content = "need to include some content"
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id],
    initialValues: state.posts[ownProps.match.params.id]
  };
}

// connect() the reduxForm()'ed component instead of reduxForming the connect()ed component
// do this if you want the initialValues to work
export default connect(mapStateToProps, { updatePost, fetchPost })(reduxForm({
  validate,
  form: "posts edit",
  enableReinitialize: true
})(PostsEdit))

// export default reduxForm({
//   validate,
//   form: "posts edit",
//   enableReinitialize: true
// })(
//   connect(mapStateToProps, { updatePost, fetchPost })(PostsEdit)
// );
