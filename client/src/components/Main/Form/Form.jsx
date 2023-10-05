import React, {useContext, useState} from 'react'
import { TextField, Typography, Grid, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import {v4 as uuidv4} from 'uuid';
import useStyles from './formStyles';
import { ExpenseTrackerContext } from '../../../context/Context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';

const initalState = {
    amount: '',
    category: '',
    type:  'Income',
    date: formatDate(new Date())
}
const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initalState);
    const {addTransaction} = useContext(ExpenseTrackerContext);
    
    const createTransaction = () => {
        const transaction = {
            ...formData,
            id: uuidv4(),
            amount: Number(formData.amount)
        }
        console.log('before',transaction)
        addTransaction(transaction);
        setFormData(initalState);
    }
    const selectedCategories = formData.type === 'Income' ? incomeCategories: expenseCategories;
  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography align='center' variant="subtitle2" gutterBottom>
                ...
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value })}>
                    {selectedCategories.map((category) =>  <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} type='number' label='amount' fullWidth/>
        </Grid>
        <Grid item xs={6}>
            <TextField value={formData.date} onChange={(e) => setFormData({...formData, date: formatDate(e.target.value)})}type='date' label='Date' fullWidth/>
        </Grid> 
        <Button className={classes.button} onClick={createTransaction} variant='outlined' color='primary' fullWidth>Create</Button> 
    </Grid>
  )
}

export default Form