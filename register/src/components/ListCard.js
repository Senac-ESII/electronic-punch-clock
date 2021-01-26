import React from "react";
import { List } from "semantic-ui-react";

const ListExampleDivided = (clock) => (
  <List divided verticalAlign="middle">
    <List.Item>
      <List.Content>
        <h5 className="clocks">
          {clock.user.name}
          {clock.clock.timeRegistered.substr(0, 10)}
          {clock.clock.timeRegistered.substr(10)}
        </h5>
      </List.Content>
    </List.Item>
  </List>
);
export default ListExampleDivided;
