
import Data from './data/mockup.json';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';

const initState = {
    userLogged: false,
    products: Data.map((product,index) => {
        product.index = index;
        return product;
    })
}

const rootReducer = (state = initState, action) => {

	switch (action.type) {
		case 'CREATE_PRODUCT': {
            let products = [...state.products];
            products.push(action.prod);
			return {
				...state,
				products
			};
		}
		case 'DELETE_PRODUCT': {
            let products = [...state.products];
            products.splice(action.index, 1);
			return {
				...state,
				products
			};
		}
		case 'EDIT_PRODUCT': {
            let products = [...state.products];
            let index = findById(products, action.product.Id);
            products[index] = action.product;
			return {
				...state,
				products
			};
		}
		default:
            return state;
    }
}


function findById(array, id) {
    for (let i = 0; i < array.length; i++) {
       if(id === array[i].Id) {
           return i;
       }
        
    }
}

export default rootReducer;