import React from "react";
import "../../index.css";
import {
  Box,
  Typography,
  Link
} from "@material-ui/core";
import { MainWrapper } from "../ui";

const TermsAndCondition = () => {
  return (
    <div fontSize="10" align="center" >
      <Typography variant="h2" align="center">
        Simvstr
      </Typography>
      <h2> Terms and Conditions </h2>
      <h3>GENERAL</h3>
      <p>The content and information of the pages of this website. And functionality of Simvestr is subject to change without notice. Your use of any product, service, information or materials on this website is entirely at your own risk, for which the site owner shall not be liable.</p>
      <h3> USE OF THE SERVICE</h3> 
      <p>It shall be your own responsibility to ensure that any products, services or information available through this site meet your specific requirements and make sense to use. Otherwise you need to avoid this.</p>
      <p>The trademarks, logos and techniques displayed on the Site are the property of Simvestr. All information and content located on the Site is protected by copyright. You are prohibited from copying, publishing and using any Content available on or through the Site for commercial or public purposes.</p>
      <p>Unauthorized use of the material or service may give rise to a claim for damages and/or be a criminal offense. This website may provide links to other websites. The owner has no discretion to alter, update, or control the content on a linked Site.</p>
      <p>The information, software, products and descriptions of services published on this website may include inaccuracies or typographical errors, and the owner specifically disclaims any liability for such inaccuracies or errors. You agree that owner, Its affiliates and any of their respective employees or agents will not be liable for incidental or indirect damages.</p>
      <p>The owner cannot and does not guarantee continuous, uninterrupted or secure access to Simvestr. The owner may terminate your access to the website without cause or notice.</p>
   
      <Box align="left">
        <Typography>
          <Link href="./signup">Back to Sign Up Page</Link>
        </Typography>
      </Box>
</div>
  );
};

export const TermsAndConditions = () => {
  return (
    <MainWrapper>
      <Box
        height="100%"
        alignItems="center"
        p="2rem"
        paddingTop="0"
      >
        <TermsAndCondition />
      </Box>
    </MainWrapper>
  );
};
