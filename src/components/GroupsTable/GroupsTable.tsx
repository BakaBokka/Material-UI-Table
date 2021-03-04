import React, { useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Data, Order } from "../../utils/types";
import EnhancedTableHead from "../EnhancedTableHead/EnhancedTableHead";
import AddRowModal from "../AddRowModal/AddRowModal";
import { postRow } from "../../utils/service";

const useStyles = makeStyles({
  container: {
    marginBottom: "20px"
  },
  cell: {
    padding: "6px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableFooter: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px 20px",
  },
  button: {
    height: "40px",
  },
});

function GroupsTable(props: {
  getComparator: <Key extends keyof any>(
    order: Order,
    orderBy: Key
  ) => (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number;
  stableSort: <T>(array: T[], comparator: (a: T, b: T) => number) => T[];
  groupRows: Data[];
  rows: Data[];
  setRows: (rows: Data[]) => void;
}) {
  const { getComparator, stableSort, groupRows, rows, setRows } = props;
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = useState(false);

  //Обработчик сортировки
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //Обработчик пагинации
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  //Обработчик количиства строк на страницы
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleAddRow = (newRow: Data) => {
    postRow(newRow).then((data) => {
      setRows([...rows, data]);
    });
  };


  return (
    <TableContainer component={Paper} className={classes.container} >
      <Table size="small" aria-label="a dense table">
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(groupRows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell className={classes.cell} width={"5%"}>
                  {row.id}
                </TableCell>
                <TableCell className={classes.cell} width={"35%"}>
                  {row.firstName}
                </TableCell>
                <TableCell className={classes.cell} width={"35%"}>
                  {row.lastName}
                </TableCell>
                <TableCell className={classes.cell} width={"25%"}>
                  {row.group}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.tableFooter}>
      <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={handleModal}
        >
          Add new row
        </Button>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={groupRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
       </div>
       <AddRowModal
        handleClose={handleModal}
        open={open}
        handleAddRow={handleAddRow}
      />
    </TableContainer>
  );
}

export default GroupsTable;
