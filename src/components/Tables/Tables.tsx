import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { getTableData } from "../../utils/service";
import { Data, Order, TableType } from "../../utils/types";
import UsersTable from "../UsersTable/UsersTable";
import GroupsTable from "../GroupsTable/GroupsTable";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  button: {
    marginBottom: "30px",
    marginTop: "20px",
    minWidth: "200px",

  },
});

//Функции сортировки таблицы
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function Tables() {
  const classes = useStyles();
  const [rows, setRows] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tableType, setTableType] = useState<TableType>("users");
  const groups = Array.from(
    new Set(rows.map((row: { group: string }) => row.group))
  );

  const filterGroup = (group: string) => {
    const newRows = rows.filter(
      (row: { group: string }) => row.group === group
    );
    return newRows;
  };

  //Собираем группы в отдельные массивы 
  const groupsData = () => {
    const newGroups = groups.map((group: string) => filterGroup(group));
    return newGroups;
  };


//Собираем таблицы по группам
  const tableElement = groupsData().map((groupRows: Data[]) => {
    return (
      <GroupsTable
        getComparator={getComparator}
        stableSort={stableSort}
        groupRows={groupRows}
        rows={rows}
        setRows={setRows}
        key={uuidv4()}
      />
    );
  });

  const handleClick = () => {
    tableType === "users" ? setTableType("groups") : setTableType("users");
  };

  useEffect(() => {
   getTableData().then((data) => {
    setLoading(false);
    setRows(data);
    });
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <CircularProgress color="secondary" />
  ) : (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        {tableType === "users" ? "Show Group Table" : "Show Users Table"}
      </Button>

      {tableType === "users" ? (
        <UsersTable
          getComparator={getComparator}
          stableSort={stableSort}
          rows={rows}
          setRows={setRows}
        />
      ) : (
        tableElement
      )}
    </>
  );
}

export default Tables;
