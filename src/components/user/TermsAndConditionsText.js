import React from "react";
import "../../index.css";
import {
    Typography,
} from "@material-ui/core";
import styled from "styled-components";

const StyledH3 = styled.h3` font-size:26px;`;
const StyledH4 = styled.h4` font-size:22px;`;

const TAC_Wrapper = styled.div`
	max-width:800px;
    margin:0 auto;
`;
export const TermsAndConditionsText = () => {
    return (
        <TAC_Wrapper>
            <Typography variant="h2" align="center">Simvestr</Typography>
            <StyledH3> Terms and Conditions</StyledH3>
            <StyledH4>GENERAL</StyledH4>
            The content and information of the pages of this website and functionality of Simvestr is subject to change without notice.
            Your use of any product, service, information or materials on this website is entirely at your own risk, for which the site
            owner shall not be liable.
            <StyledH4> USE OF THE SERVICE</StyledH4>
            It shall be your own responsibility to ensure that any products, services or information available through this site meet
            your specific requirements and make sense to use. Otherwise you need to avoid this.
            The trademarks, logos and techniques displayed on the Site are the property of Simvestr. All information and content located
            on the Site is protected by copyright. You are prohibited from copying, publishing and using any Content available on or through
            the Site for commercial or public purposes.
            Unauthorized use of the material or service may give rise to a claim for damages and/or be a criminal offense. This website
            may provide links to other websites. The owner has no discretion to alter, update, or control the content on a linked Site.
            The information, software, products and descriptions of services published on this website may include inaccuracies or
            typographical errors, and the owner specifically disclaims any liability for such inaccuracies or errors. You agree that Simvestr,
            its affiliates and any of their respective employees or agents will not be liable for incidental or indirect damages.
            The owner cannot and does not guarantee continuous, uninterrupted or secure access to Simvestr. The owner may terminate
            your access to the website without cause or notice.
        </TAC_Wrapper>
    );
};
