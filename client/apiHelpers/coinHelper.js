
import axios from 'axios';
import { API_ROOT, NOMICS_API_ROOT } from './constants';

export const getCoins = async () => {
    try{
        const result = await axios.get(`${API_ROOT}/coins/`);
        return result.data;
    }catch(error){
        console.log(error);
    }
}