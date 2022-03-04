import classes from "./StartupTableBodyRow.module.css";

const StartupTableHeadRow = () => {
    return(
        <tr>
        <th className={classes.column1}></th>
        <th className={classes.column2}>Nombre de la Startup</th>
        <th className={classes.column3}>Estado</th>
        <th className={classes.column4}>Direccion</th>
        <th className={classes.column5}>Ciudad</th>
        <th className={classes.column6}>Fecha de Inscription</th>
    </tr>
    )
}

export default StartupTableHeadRow;