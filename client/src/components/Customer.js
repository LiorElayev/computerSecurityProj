import React, {useState} from "react";

const Customer = (props) => {
  //---------------------------------------------------------------------------------------------
  // solution to stored XSS :
  //const html = encodeURIComponent(props.firstName + " " + props.lastName).replace("%20"," ");
  //---------------------------------------------------------------------------------------------
  const html = props.firstName + " " + props.lastName
  return (
    <div className="five wide column">
      <div className="ui card ">
        <div className="content">
          <div
            className="header"
            dangerouslySetInnerHTML={{__html: html}}
          ></div>
          <div className="meta">
            <span className="right floated time">{props.customerID}</span>
          </div>
          <div className="description">
            <p></p>
          </div>
          <div id="messageContainer"></div>
          <script>
            ...
            $("#messageContainer").append(myMessage);
            ...
          </script>
          <div className="extra content">
            <div className="left floated author">
              {props.emailAddress}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Customer;
