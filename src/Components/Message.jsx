import React from "react";
import "../App.css";
import { MyContext } from "../App.js";

class Message extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            {context.state.messages.map(message => {
              return (
                <div
                  className={
                    "row message" +
                    (message.read ? " read" : " unread") +
                    (message.selected ? " selected" : "")
                  }
                  key={message.id}
                >
                  <div className="col-xs-1">
                    <div className="row">
                      <div className="col-xs-2">
                        <input
                          type="checkbox"
                          onClick={() => context.toggleSelected(message.id)}
                          checked={message.selected ? true : false}
                        />
                      </div>
                      <div className="col-xs-2">
                        <i
                          className={
                            "star fa fa-star" + (message.starred ? "" : "-o")
                          }
                          onClick={() => context.toggleStarred(message.id)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-11">
                    {message.labels.map(label => {
                      return (
                        <span className="label label-warning">{label}</span>
                      );
                    })}
                    <a href="/">{message.subject}</a>;
                  </div>
                </div>
              );
            })}
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Message;
