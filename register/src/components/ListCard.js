import React from "react";
import { Image, List } from "semantic-ui-react";

const ListExampleDivided = (clock) => (
  <List divided verticalAlign="middle">
    <List.Item>
      <List.Content>
        <List.Header>{clock.clock.timeRegistered}</List.Header>
      </List.Content>
    </List.Item>
  </List>
);
export default ListExampleDivided;
