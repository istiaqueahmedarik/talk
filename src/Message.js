import React, { forwardRef } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './Message.css';



const message  = forwardRef(({message, username,picc,imageurl} ,ref) => {
    const isUser = username === message.username;
    return (
        
            <div ref = {ref} className={`message ${isUser && 'message__user'}`}>
                <TableContainer >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colspan="2"><h6 className="th">{!isUser && `${message.uid || 'Unknown User'}  `} </h6></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><img src={message.picc} alt='p' className={isUser ? "pic" : "pic2"} /></TableCell>
                                <TableCell>
                                <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                
                                            <CardContent>
                                                
                                                <Typography
                                                color='white'
                                                variant='h5'
                                                component='h2'
                                                >
                                                    {message.message} 
                                                    <img className="msgimage" src={imageurl}/>
                                                </Typography>
                                                
                                            </CardContent>
                                        </Card>



                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>





                
            
            </div>
            
            
        
    )
})

export default message
