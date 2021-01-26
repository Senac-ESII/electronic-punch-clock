import React from "react";
import { Image, List } from "semantic-ui-react";

const ListExampleDivided = (clock) => (
  <List divided verticalAlign="middle">
    <List.Item>
      <List.Content>
        <h5 className="clocks">
          {clock.clock.timeRegistered.substr(0, 10)}
          {clock.clock.timeRegistered.substr(10)}
        </h5>
      </List.Content>
    </List.Item>
  </List>
);
export default ListExampleDivided;
