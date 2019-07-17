import React, { Component } from "react";
import "./App.css";
import Toolbar from "./Components/Toolbar";
import MessageList from "./Components/MessageList";

export const MyContext = React.createContext(); //step 1

class MyProvider extends Component {
  //provider component
  state = {
    messages: [
      {
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ["dev", "personal"]
      },
      {
        id: 2,
        subject:
          "connecting the system won't do anything, we need to input the mobile AI panel!",
        read: false,
        starred: false,
        selected: false,
        labels: []
      },
      {
        id: 3,
        subject:
          "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        read: false,
        starred: true,
        labels: ["dev"]
      },
      {
        id: 4,
        subject: "We need to program the primary TCP hard drive!",
        read: true,
        starred: false,
        selected: false,
        labels: []
      },
      {
        id: 5,
        subject:
          "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        read: false,
        starred: false,
        labels: ["personal"]
      },
      {
        id: 6,
        subject: "We need to back up the wireless GB driver!",
        read: true,
        starred: true,
        labels: []
      },
      {
        id: 7,
        subject: "We need to index the mobile PCI bus!",
        read: true,
        starred: false,
        labels: ["dev", "personal"]
      },
      {
        id: 8,
        subject:
          "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        read: true,
        starred: true,
        labels: []
      }
    ]
  };
  toggleStarred = id => {
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
    console.log(id);
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
  addLabel = label => {
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
  };
  removeLabel = label => {
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
  };
  deleteMessages = () => {
    this.setState({
      messages: this.state.messages.filter(message => {
        if (!message.selected) {
          return true;
        }
        return false;
      })
    });
  };
  markRead = () => {
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
  };
  markUnread = () => {
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
          removeLabel: this.removeLabel
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
