import React from 'react';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme: Theme) => createStyles({

  tablecell: {
      fontSize: '16pt',
      color: 'black'
  },
}));  

function Portfolio(props) {

  const classes = useStyles();
  return (
          <TableRow>
              <TableCell className={classes.tablecell} style={{width: 30}} align="left">{props.position}</TableCell>
              <TableCell className={classes.tablecell} style={{width: 250}} align="left">{props.user}</TableCell>
              <TableCell className={classes.tablecell} align="left">{props.name}</TableCell>
              <TableCell className={classes.tablecell} align="right">${props.value}.00</TableCell>
            </TableRow>
          )

}
export default Portfolio;
