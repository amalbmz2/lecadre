import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Trans } from "react-i18next";

export class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          task: "Pick up kids from school",
          isCompleted: false,
        },
        {
          id: 2,
          task: "Prepare for presentation",
          isCompleted: true,
        },
        {
          id: 3,
          task: "Print Statements",
          isCompleted: false,
        },
        {
          id: 4,
          task: "Create invoice",
          isCompleted: false,
        },
        {
          id: 5,
          task: "Call John",
          isCompleted: true,
        },
        {
          id: 6,
          task: "Meeting with Alisa",
          isCompleted: false,
        },
      ],
      inputValue: "",
    };

    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  statusChangedHandler(event, id) {
    const todo = { ...this.state.todos[id] };
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
      todos: todos,
    });
  }
  statusChangedHandlerRtl(event, id) {
    const todoRtl = { ...this.state.todosRtl[id] };
    todoRtl.isCompleted = event.target.checked;

    const todosRtl = [...this.state.todosRtl];
    todosRtl[id] = todoRtl;

    this.setState({
      todosRtl: todosRtl,
    });
  }

  addTodo(event) {
    event.preventDefault();

    const todos = [...this.state.todos];
    todos.unshift({
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      task: this.state.inputValue,
      isCompleted: false,
    });

    this.setState({
      todos: todos,
      inputValue: "",
    });
  }
  addTodoRtl(event) {
    event.preventDefault();

    const todosRtl = [...this.state.todosRtl];
    todosRtl.unshift({
      id: todosRtl.length ? todosRtl[todosRtl.length - 1].id + 1 : 1,
      task: this.state.inputValue,
      isCompleted: false,
    });

    this.setState({
      todosRtl: todosRtl,
      inputValue: "",
    });
  }

  removeTodo(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);

    this.setState({
      todos: todos,
    });
  }
  removeTodoRtl(index) {
    const todosRtl = [...this.state.todosRtl];
    todosRtl.splice(index, 1);

    this.setState({
      todosRtl: todosRtl,
    });
  }

  inputChangeHandler(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  closeRightSidebar() {
    document.querySelector(".right-sidebar").classList.remove("open");
  }

  render() {
    return (
      <div>
        <div id="right-sidebar" className="settings-panel right-sidebar">
          <i
            className="settings-close mdi mdi-close"
            onClick={this.closeRightSidebar}
          ></i>
          <Tabs
            defaultActiveKey="TODOLIST"
            className="bg-gradient-primary"
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="TODOLIST" title="TO DO LIST" className="test-tab">
              <div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="px-3">
                      <div>
                        <h4 className="card-title">
                          <Trans>Todo List</Trans>
                        </h4>
                        <form
                          className="add-items d-flex"
                          onSubmit={this.addTodo}
                        >
                          <input
                            type="text"
                            className="form-control h-auto"
                            placeholder="What do you need to do today?"
                            value={this.state.inputValue}
                            onChange={this.inputChangeHandler}
                            required
                          />
                          <button
                            type="submit"
                            className="btn btn-gradient-primary font-weight-bold"
                          >
                            <Trans>Add</Trans>
                          </button>
                        </form>
                        <div className="list-wrapper">
                          <ul className="todo-list">
                            {this.state.todos.map((todo, index) => {
                              return (
                                <ListItem
                                  isCompleted={todo.isCompleted}
                                  changed={(event) =>
                                    this.statusChangedHandler(event, index)
                                  }
                                  key={todo.id}
                                  remove={() => this.removeTodo(index)}
                                >
                                  {todo.task}
                                </ListItem>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
const ListItem = (props) => {
  return (
    <li className={props.isCompleted ? "completed" : null}>
      <div className="form-check">
        <label htmlFor="" className="form-check-label">
          <input
            className="checkbox"
            type="checkbox"
            checked={props.isCompleted}
            onChange={props.changed}
          />{" "}
          {props.children} <i className="input-helper"></i>
        </label>
      </div>
      <i
        className="remove mdi mdi-close-circle-outline"
        onClick={props.remove}
      ></i>
    </li>
  );
};

export default SettingsPanel;
