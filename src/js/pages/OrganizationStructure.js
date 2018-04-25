import "../../scss/page/OrganizationStructure.scss";
import React from 'react';
import { Container } from "../UIComponents/index";

const OrganizationStructure = () => {
    return (
        <Container id="organizationStructure" >
            <img src={require("../../img/organizationStructure.png")} alt=""/>
        </Container>
    );
};

module.exports=OrganizationStructure;