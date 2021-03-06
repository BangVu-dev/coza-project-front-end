import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import { ProductWithDetail } from '../../../model/Product';
import { Context } from '../../../store/ProductContext';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

interface Props {
    row: ProductWithDetail;
    handleOpen: () => void;
    onUpdate: () => void;
    onDelete: () => void;
    handleOpenModelItem: () => void;
    getProductId: (productId: string) => void;
    onDeleteProductItem: () => void;
}

export default function RowTable(props: Props) {
    const [open, setOpen] = useState(false);
    const { updateProductItem, changeIdProductItem, changeDisableInput } = useContext(Context);
    let createdAt = new Date(props.row.createdAt);
    let updatedAt = new Date(props.row.updatedAt);

    return (        
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="medium"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.row.name.length == props.row.name.substring(0, 14).length ? props.row.name.substring(0, 14) : props.row.name.substring(0, 14) + "..."}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                    <img style={{ width: "70px" }} src={props.row.imageProduct} alt="" />
                </TableCell>
                <TableCell align="left">{props.row.brand}</TableCell>
                <TableCell align="left">{props.row.gender}</TableCell>
                <TableCell align="left">{createdAt.toLocaleString()}</TableCell>
                <TableCell align="left">{updatedAt.toLocaleString()}</TableCell>
                <TableCell align="left">{props.row.sold}</TableCell>
                <TableCell className="icon-action-product" align="center"><FaEdit style={{marginRight: "5px"}} onClick={() => { props.onUpdate(); props.handleOpen(); changeDisableInput(true) }} /> <RiDeleteBin6Line onClick={() => props.onDelete()} /></TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Product variant
                                <Fab color="primary" style={{width: "40px", height: "40px", marginLeft: "20px"}} onClick={() => { props.handleOpenModelItem(); props.getProductId(props.row.id) }} aria-label="add">
                                    <AddIcon />
                                </Fab>
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Color</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell align="left">Quantity</TableCell>
                                        <TableCell align="left">Price ($)</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.row.productItem.map((item, index) => (
                                        <TableRow key={item.productItemId}>
                                            <TableCell component="th" scope="row">
                                                <img style={{ width: "60px" }} src={item.image} alt="" />
                                            </TableCell>
                                            <TableCell>{item.color}</TableCell>
                                            <TableCell align="left">{item.size}</TableCell>
                                            <TableCell align="left">
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell align="left">{item.price}</TableCell>
                                            <TableCell className="icon-action-product-item" align="center"><FaEdit style={{marginRight: "5px"}} onClick={() => { props.handleOpenModelItem(); updateProductItem(item) }} /> <RiDeleteBin6Line onClick={() => { changeIdProductItem(item.productItemId); props.onDeleteProductItem() }} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
