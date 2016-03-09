import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';

/* component styles */
import { styles } from './styles.scss';

export class AddItem extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    fields: React.PropTypes.object.isRequired,
    items: React.PropTypes.array,
    addItem: React.PropTypes.func,
    addNewItemToServer: React.PropTypes.func,
    fetchItems: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  onAdd = (event) => {
    if (this.props.fields.name.value) {
      /* add item*/
      // this.props.addItem(this.props.fields);

      const node = this.refs['todo-input'];
      this.props.addNewItemToServer(node.value);

      /* reset form */
      this.props.dispatch(reset('addItem'));
    }
    event.preventDefault();
  };

  onFetchData = (event) => {
    this.props.fetchItems({});
  };

  render() {
    const {
      fields: { name },
    } = this.props;

    return (
      <form className={styles} onSubmit={this.onAdd}>
        <div className="form-group">
          <input
            type="text"
            ref="todo-input"
            className="form-control"
            placeholder="Enter something"
            {...name}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-default" onClick={this.onAdd}>
            Add item
          </button>
        </div>
        <div className="form-group">
          <button className="btn btn-inverse" onClick={this.onFetchData}>
            Fetch Item
          </button>
        </div>
      </form>
    );
  }
}

AddItem = reduxForm({
  form: 'addItem',
  fields: ['name'],
  destroyOnUnmount: false,
})(AddItem);

export default AddItem;
