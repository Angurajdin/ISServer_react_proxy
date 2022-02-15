import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(props.left);
    const [right, setRight] = React.useState(props.right);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
        props.getValue(not(left, leftChecked));
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        props.getValue(not(left, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        props.getValue(not(left, leftChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        props.getValue(not(left, leftChecked));
    };

    const customList = (items) => (
        <Paper sx={{ width: 350, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`List item ${value + 1}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    

    return (
        <Root sx={{ pl: 5, width: 800, pt:3 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ bgcolor: 'text.disabled' }}>
                        <TableCell size='small' sx={{ fontWeight: 'bold', textAlign: 'center' }}>{"Preferred" + props.title}</TableCell>
                        <TableCell size='small' sx={{ fontWeight: 'bold' }}></TableCell>
                        <TableCell size='small' sx={{ fontWeight: 'bold', textAlign: 'center' }}>{"Excluded" + props.title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={"row"}>
                        <TableCell size='small'><Grid item>{customList(left)}</Grid></TableCell>
                        <TableCell size='small'>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllRight}
                                        disabled={left.length === 0}
                                        aria-label="move all right"
                                    >
                                        ≫
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllLeft}
                                        disabled={right.length === 0}
                                        aria-label="move all left"
                                    >
                                        ≪
                                    </Button>
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell size='small'><Grid item>{customList(right)}</Grid></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Root>
    );
}
