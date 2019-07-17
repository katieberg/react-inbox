import React from "react";
import "../App.css";
import { MyContext } from "../App.js";

class Toolbar extends React.Component {
  unread = msgArr => {
    let unread = 0;
    for (let el of msgArr) {
      if (!el.read) {
        unread += 1;
      }
    }
    return unread;
  };
  selected = msgArr => {
    let selected = 0;
    for (let el of msgArr) {
      if (el.selected) {
        selected += 1;
      }
    }
    return selected;
  }; //change this so you can use the same function but pass the action as an argument
  labelHandler = e => {
    console.log(e.target.value);
  };
  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <MyContext.Consumer>
            {context => (
              <>
                <p className="pull-right">
                  <>
                    <span className="badge badge">
                      {this.unread(context.state.messages)}
                    </span>
                    unread message
                    {this.unread(context.state.messages) === 1 ? "" : "s"}
                  </>
                </p>
                <a class="btn btn-danger" href="/">
                  <i class="fa fa-plus" />
                </a>
                {this.selected(context.state.messages) === 0 ? (
                  <button
                    className="btn btn-default"
                    onClick={context.bulkSelect}
                  >
                    <i className="fa fa-square-o" />
                  </button>
                ) : this.selected(context.state.messages) ===
                  context.state.messages.length ? (
                  <button
                    className="btn btn-default"
                    onClick={context.bulkSelect}
                  >
                    <i className="fa fa-check-square-o" />
                  </button>
                ) : (
                  <button class="btn btn-default">
                    <i class="fa fa-minus-square-o" />
                  </button>
                )}

                <button className="btn btn-default" onClick={context.markRead}>
                  Mark As Read
                </button>

                <button
                  className="btn btn-default"
                  onClick={context.markUnread}
                >
                  Mark As Unread
                </button>

                <select className="form-control label-select">
                  <option>Apply label</option>
                  <option
                    value="dev"
                    onClick={() => {
                      context.addLabel("dev");
                    }}
                  >
                    dev
                  </option>
                  <option
                    value="personal"
                    onClick={() => {
                      context.addLabel("personal");
                    }}
                  >
                    personal
                  </option>
                  <option
                    value="gschool"
                    onClick={() => {
                      context.addLabel("gschool");
                    }}
                  >
                    gschool
                  </option>
                </select>

                <select className="form-control label-select">
                  <option>Remove label</option>
                  <option
                    value="dev"
                    onClick={() => {
                      context.removeLabel("dev");
                    }}
                  >
                    dev
                  </option>
                  <option
                    value="personal"
                    onClick={() => {
                      context.removeLabel("personal");
                    }}
                  >
                    personal
                  </option>
                  <option
                    value="gschool"
                    onClick={() => {
                      context.removeLabel("gschool");
                    }}
                  >
                    gschool
                  </option>
                </select>

                <button
                  className="btn btn-default"
                  onClick={context.deleteMessages}
                >
                  <i className="fa fa-trash-o" />
                </button>
              </>
            )}
          </MyContext.Consumer>
        </div>
      </div>
    );
  }
}

export default Toolbar;
