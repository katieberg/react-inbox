import React from "react";
import "../App.css";
import { MyContext } from "../App.js";

class ComposeForm extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <form
              class="form-horizontal well"
              hidden={context.state.newMessage ? false : true}
            >
              <div class="form-group">
                <div class="col-sm-8 col-sm-offset-2">
                  <h4>Compose Message</h4>
                </div>
              </div>
              <div class="form-group">
                <label for="subject" class="col-sm-2 control-label">
                  Subject
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="subject"
                    placeholder="Enter a subject"
                    name="subject"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="body" class="col-sm-2 control-label">
                  Body
                </label>
                <div class="col-sm-8">
                  <textarea name="body" id="body" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-8 col-sm-offset-2">
                  <input type="submit" value="Send" class="btn btn-primary" />
                </div>
              </div>
            </form>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default ComposeForm;
