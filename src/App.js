import React, { Component } from "react";
import "./App.css";
import Toolbar from "./Components/Toolbar";
import MessageList from "./Components/MessageList";

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    messages: [],
    selectedIds: [], //want to refactor so we can keep track of selected items (for patch request purposes)
    newMessage: false
  };
  async componentDidMount() {
    const response = await fetch(`http://localhost:8082/api/messages`);
    const json = await response.json();
    this.setState({
      messages: json.map(message => {
        return { ...message };
      })
    });
    const ids = [];
    for (let el of this.state.messages) {
      if (el.selected) {
        ids.push(el.id);
      }
    }
    this.setState({
      selectedIds: ids
    });
  }
  toggleComposeForm = () => {
    this.setState({
      newMessage: !this.state.newMessage
    });
  };
  toggleStarred = async id => {
    const res = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({ messageIds: [id], command: "star" }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      this.setState({
        messages: this.state.messages.map(message => {
          if (message.id === id) {
            return {
              ...message,
              starred: !message.starred
            };
          } else {
            return {
              ...message
            };
          }
        })
      });
    } else {
      console.log("uh oh - server issue");
    }
  };
  toggleSelected = id => {
    this.setState({
      messages: this.state.messages.map(message => {
        if (message.id === id) {
          return {
            ...message,
            selected: !message.selected
          };
        } else {
          return {
            ...message
          };
        }
      })
    });
  };
  addLabel = async label => {
    const ids = [];
    for (let el of this.state.messages) {
      if (el.selected) {
        ids.push(el.id);
      }
    }
    const res = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: ids,
        command: "addLabel",
        label: label
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      this.setState({
        messages: this.state.messages.map(message => {
          if (message.selected) {
            if (message.labels.includes(label)) {
              return {
                ...message
              };
            } else {
              return {
                ...message,
                labels: [label].concat(message.labels)
              };
            }
          } else {
            return {
              ...message
            };
          }
        })
      });
    }
  };
  removeLabel = async label => {
    const ids = [];
    for (let el of this.state.messages) {
      if (el.selected) {
        ids.push(el.id);
      }
    }
    const res = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: ids,
        command: "removeLabel",
        label: label
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      this.setState({
        messages: this.state.messages.map(message => {
          if (message.selected) {
            if (message.labels.includes(label)) {
              return {
                ...message,
                labels: message.labels.filter(arrLabel => {
                  if (arrLabel === label) {
                    return false;
                  }
                  return true;
                })
              };
            } else {
              return {
                ...message
              };
            }
          } else {
            return {
              ...message
            };
          }
        })
      });
    }
  };
  deleteMessages = async () => {
    const ids = [];
    for (let el of this.state.messages) {
      if (el.selected) {
        ids.push(el.id);
      }
    }
    const res = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({ messageIds: ids, command: "delete" }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      this.setState({
        messages: this.state.messages.filter(message => {
          if (!message.selected) {
            return true;
          }
          return false;
        })
      });
    } else {
      console.log("uh oh server error");
    }
  };
  markRead = async () => {
    const ids = [];
    for (let el of this.state.messages) {
      if (el.selected) {
        ids.push(el.id);
      }
    }
    const res = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({ messageIds: ids, command: "read", read: true }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      this.setState({
        messages: this.state.messages.map(message => {
          if (message.selected) {
            return {
              ...message,
              read: true
            };
          } else {
            return {
              ...message,
              read: message.read
            };
          }
        })
      });
    } else console.log("uh oh, server issue");
  };
  markUnread = async () => {
    const ids = [];
    for (let el of this.state.messages) {
      if (el.selected) {
        ids.push(el.id);
      }
    }
    const res = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({ messageIds: ids, command: "read", read: false }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      this.setState({
        messages: this.state.messages.map(message => {
          if (message.selected) {
            return {
              ...message,
              read: false
            };
          } else {
            return {
              ...message,
              read: message.read
            };
          }
        })
      });
    }
  };
  bulkSelect = () => {
    let selected = 0;
    for (let el of this.state.messages) {
      if (el.selected) {
        selected += 1;
      }
    }
    if (selected === this.state.messages.length) {
      this.setState({
        messages: this.state.messages.map(message => {
          return {
            ...message,
            selected: false
          };
        })
      });
    } else {
      this.setState({
        messages: this.state.messages.map(message => {
          return {
            ...message,
            selected: true
          };
        })
      });
    }
  };
  addMessage = async composeState => {
    const res = await fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify({
        subject: composeState.subject,
        body: composeState.body
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      this.setState({
        messages: this.state.messages.concat([
          {
            subject: composeState.subject,
            body: composeState.body,
            read: false,
            starred: false,
            labels: []
          }
        ])
      });
    }
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          toggleSelected: this.toggleSelected,
          markRead: this.markRead,
          markUnread: this.markUnread,
          toggleStarred: this.toggleStarred,
          bulkSelect: this.bulkSelect,
          deleteMessages: this.deleteMessages,
          addLabel: this.addLabel,
          removeLabel: this.removeLabel,
          toggleComposeForm: this.toggleComposeForm,
          addMessage: this.addMessage
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

function App() {
  return (
    <MyProvider>
      <div className="App">
        <header className="App-header" />
        <Toolbar />
        <MessageList />
      </div>
    </MyProvider>
  );
}

export default App;

//see body of message
//performance issues like store some data in state
