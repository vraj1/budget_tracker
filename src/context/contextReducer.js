const contextReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TRANSACTION':
            const transactions = [action.payload, ...state];
            return transactions;
        case 'DELETE_TRANSACTION': 
            const updatedTransactions = state.filter((transaction) => transaction.id !== action.payload)
            return updatedTransactions;
        default: 
            return state;
    }
}

export default contextReducer;