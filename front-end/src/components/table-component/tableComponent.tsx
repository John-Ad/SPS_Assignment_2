import { Add, CheckCircleOutline, DeleteForever, DoNotDisturbOn, Edit, Padding, Pending, Visibility } from "@mui/icons-material";
import { Box, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Check2, X } from "react-bootstrap-icons";
import { IGlobalContext } from "../../interfaces/general_interfaces";
import Loading from "../loading-component/loading";
import "./tableComponent.css";

enum TABLE_STATUS {
    BAD = 0,
    WARNING = 1,
    GOOD = 2
}

export enum TABLE_DATA_TYPE {
    ID,
    STRING,
    SWITCH,
    STATUS,
    BADGE_SUCCESS,
    BADGE_WARNING,
    BADGE_DANGER,
}

export interface IColumnData {
    type: TABLE_DATA_TYPE,
    value: string | number | boolean,
    callback?: any,
    elem?: React.ReactNode
}

interface IData {
    colValues: IColumnData[]
}

interface IProps {
    title: string,
    context: IGlobalContext,

    titleCol?: string,
    titleBgCol?: string,

    ids: any[],
    headerValues: string[],
    data: IData[],

    filterComponent?: React.ReactNode,

    loading?: boolean,

    onAdd?(): void,
    onView?(id: any): void,
    onEdit?(id: any): void,
    onDelete?(id: any): void,

    onApprove?(id: any): void,
    onReject?(id: any): void
}

const TableComponent = (props: IProps) => {

    return (

        <Box className="rounded table-component" sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>

                <Toolbar sx={{
                    alignItems: "center",
                    borderBottom: "1px solid #bbb",
                    // p: "20px"
                    marginBottom: "20px",

                    backgroundColor: props.titleBgCol ?? ""
                }}>
                    <Typography
                        sx={{
                            width: "100%",
                            textAlign: "start",
                            color: props.titleCol ?? "#666",
                        }}
                        variant="h4"
                        component="div"
                    >
                        {props.title}
                    </Typography>
                    {
                        props.onAdd &&
                        <Add onClick={() => { if (props.onAdd) props.onAdd() }} fontSize="large" className="hor-center hover btn-approve" />
                    }
                </Toolbar>

                <div className="vert-flex justify-end table-component-filter">
                    {
                        props.filterComponent &&
                        props.filterComponent
                    }
                </div>

                <TableContainer>
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                {
                                    props.headerValues.map((val, index) => {
                                        return (
                                            <TableCell width={""} key={index} align="center">{val}</TableCell>
                                        );
                                    })
                                }
                                {
                                    props.onView &&
                                    <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}></TableCell>
                                }
                                {
                                    props.onEdit &&
                                    <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}></TableCell>
                                }
                                {
                                    props.onDelete &&
                                    <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}></TableCell>
                                }
                                {
                                    props.onReject &&
                                    <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}></TableCell>
                                }
                                {
                                    props.onApprove &&
                                    <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}></TableCell>
                                }
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                props.loading &&
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell colSpan={props.headerValues.length} align="center">
                                        <Loading color="blue" />
                                    </TableCell>
                                </TableRow>
                            }
                            {
                                (!props.loading && props.data.length === 0) &&
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell colSpan={props.headerValues.length} align="center">
                                        <h5>Nothing to show</h5>
                                    </TableCell>
                                </TableRow>
                            }
                            {
                                !props.loading &&
                                props.data.map((row, index) => {
                                    return (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            {
                                                row.colValues.map((col, j) => {
                                                    return (
                                                        <>
                                                            {   // ID VALUES

                                                                col.type === TABLE_DATA_TYPE.ID &&
                                                                <TableCell width={props.context.isMobile ? "50px" : "100px"} key={j} align="center">{col.value}</TableCell>
                                                            }
                                                            {   // STRING VALUES

                                                                col.type === TABLE_DATA_TYPE.STRING &&
                                                                <TableCell width={"fit-content"} key={j} align="center">{col.value}</TableCell>
                                                            }
                                                            {   // SWITCH VALUES

                                                                col.type === TABLE_DATA_TYPE.SWITCH &&
                                                                <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}>
                                                                    <Switch onChange={(ev) => { if (col.callback) col.callback(props.ids[index], ev.target.checked) }} checked={col.value as boolean} />
                                                                </TableCell>
                                                            }
                                                            {   // STATUS VALUES

                                                                col.type === TABLE_DATA_TYPE.STATUS &&
                                                                <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`} >
                                                                    {
                                                                        col.value === TABLE_STATUS.BAD &&
                                                                        <DoNotDisturbOn className="icon-sm hor-center" color="error" />
                                                                    }
                                                                    {
                                                                        col.value === TABLE_STATUS.WARNING &&
                                                                        <Pending className="icon-sm hor-center" color="warning" />
                                                                    }
                                                                    {
                                                                        col.value === TABLE_STATUS.GOOD &&
                                                                        <CheckCircleOutline className="icon-sm hor-center" color="success" />
                                                                    }
                                                                </TableCell>
                                                            }
                                                            {   // SUCCESS BADGE 

                                                                col.type === TABLE_DATA_TYPE.BADGE_SUCCESS &&
                                                                <TableCell width={`${props.context.isMobile ? "50px" : "80px"}`}>
                                                                    <Badge className={col.callback ? "hover" : ""} onClick={() => { if (col.callback) col.callback(props.ids[index]) }} bg="success">{col.value}</Badge>
                                                                </TableCell>
                                                            }
                                                            {   // WARNING BADGE 

                                                                col.type === TABLE_DATA_TYPE.BADGE_WARNING &&
                                                                <TableCell width={`${props.context.isMobile ? "50px" : "80px"}`}>
                                                                    <Badge className={col.callback ? "hover" : ""} onClick={() => { if (col.callback) col.callback(props.ids[index]) }} bg="warning">{col.value}</Badge>
                                                                </TableCell>
                                                            }
                                                            {   // DANGER BADGE 

                                                                col.type === TABLE_DATA_TYPE.BADGE_DANGER &&
                                                                <TableCell width={`${props.context.isMobile ? "50px" : "80px"}`}>
                                                                    <Badge className={col.callback ? "hover" : ""} onClick={() => { if (col.callback) col.callback(props.ids[index]) }} bg="danger">{col.value}</Badge>
                                                                </TableCell>
                                                            }
                                                        </>
                                                    );
                                                })
                                            }


                                            {
                                                props.onView &&
                                                <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}>
                                                    <Visibility onClick={() => { if (props.onView) props.onView(props.ids[index]) }} className="icon-m hover seen" />
                                                </TableCell>
                                            }
                                            {
                                                props.onEdit &&
                                                <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}>
                                                    <Edit onClick={() => { if (props.onEdit) props.onEdit(props.ids[index]) }} className="icon-m hover unseen" />
                                                </TableCell>
                                            }
                                            {
                                                props.onDelete &&
                                                <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}>
                                                    <DeleteForever onClick={() => { if (props.onDelete) props.onDelete(props.ids[index]) }} className="icon-m hover btn-reject" />
                                                </TableCell>
                                            }
                                            {
                                                props.onReject &&
                                                <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}>
                                                    <X onClick={() => { if (props.onReject) props.onReject(props.ids[index]) }} className="icon-m hover btn-reject" />
                                                </TableCell>
                                            }
                                            {
                                                props.onApprove &&
                                                <TableCell width={`${props.context.isMobile ? "30px" : "70px"}`}>
                                                    <Check2 onClick={() => { if (props.onApprove) props.onApprove(props.ids[index]) }} className="icon-m hover btn-approve" />
                                                </TableCell>
                                            }
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default TableComponent;


