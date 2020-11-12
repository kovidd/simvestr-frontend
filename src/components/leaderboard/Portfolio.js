import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) =>
  createStyles({
    tablecell: {
      fontSize: "12pt",
      color: "black",
      maxWidth: 200,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

function Portfolio(props) {
  const classes = useStyles();
  const bgColour = props.thisUser ? "#f3f3f3" : "white";

  return (
    <TableRow style={{ background: bgColour }}>
      <TableCell className={classes.tablecell} width="10%" align="left">
        {props.position}
      </TableCell>
      <TableCell className={classes.tablecell} width="35%" align="left">
        {props.user}
      </TableCell>
      <TableCell className={classes.tablecell} width="30%" align="left">
        {props.name}
      </TableCell>
      <TableCell className={classes.tablecell} width="25%" align="right">
        ${props.value.toFixed(2)}
      </TableCell>
    </TableRow>
  );
}
export default Portfolio;
