import React from "react";
import "../App.css";
import Message from "./Message";
import ComposeForm from "./ComposeForm";

class MessageList extends React.Component {
  render() {
    return (
      <>
        <ComposeForm />
        <Message />
      </>
    );
  }
}

export default MessageList;
