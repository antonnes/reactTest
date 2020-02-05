
import Data from './data/mockup.json';

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
		default:
            return state;
    }
}

export default rootReducer;