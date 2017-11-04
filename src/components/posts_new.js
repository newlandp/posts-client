import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends React.Component {
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

  onFormSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <div>
          Hello world
        </div>
        <Link to="/">
          Back to Posts
        </Link>
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
            type="text"
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

export default reduxForm({
  validate,
  form: 'posts new'
})(
  connect(null, {createPost})(PostsNew)
);
