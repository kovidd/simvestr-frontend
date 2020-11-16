import React from "react";
import { Box, Typography } from "@material-ui/core";

export const TermsAndConditionsText = () => {
  return (
    <Box>
      <Box mt="1rem">
        <Typography variant="subtitle2" color="primary">
          GENERAL
        </Typography>
        <Typography variant="body1">
          The content and information of the pages of this website and
          functionality of Simvestr is subject to change without notice. Your
          use of any product, service, information or materials on this website
          is entirely at your own risk, for which the site owner shall not be
          liable.
        </Typography>
      </Box>
      <Box mt="1rem">
        <Typography variant="subtitle2" color="primary">
          USE OF THE SERVICE
        </Typography>
        <Typography variant="body1">
          It shall be your own responsibility to ensure that any products,
          services or information available through this site meet your specific
          requirements and make sense to use. Otherwise you need to avoid this.
          The trademarks, logos and techniques displayed on the Site are the
          property of Simvestr. All information and content located on the Site
          is protected by copyright. You are prohibited from copying, publishing
          and using any Content available on or through the Site for commercial
          or public purposes. Unauthorized use of the material or service may
          give rise to a claim for damages and/or be a criminal offense. This
          website may provide links to other websites. The owner has no
          discretion to alter, update, or control the content on a linked Site.
          The information, software, products and descriptions of services
          published on this website may include inaccuracies or typographical
          errors, and the owner specifically disclaims any liability for such
          inaccuracies or errors. You agree that Simvestr, its affiliates and
          any of their respective employees or agents will not be liable for
          incidental or indirect damages. The owner cannot and does not
          guarantee continuous, uninterrupted or secure access to Simvestr. The
          owner may terminate your access to the website without cause or
          notice.
        </Typography>
      </Box>
    </Box>
  );
};
