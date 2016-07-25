import React from "react";

import Group from "../UIComponents/Group";

let NotFound = React.createClass({
    render() {
        return (
            <Group
                header="404"
            >
                <h2>Not found.</h2>
            </Group>
        );
    }
});

module.exports=NotFound;