import React from "react";
import {
    Box,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import styled from "styled-components";
import { TermsAndConditionsText } from "../user/TermsAndConditionsText";

export const TermsAndConditionsSettings = () => {
    return (
        <MainWrapper>
            <Box
                height="100%"
                alignItems="center"
                p="2rem"
                paddingTop="0"
                fontSize="10"
                align="center" >

                <TermsAndConditionsText />
            </Box>
        </MainWrapper>
    );
};
