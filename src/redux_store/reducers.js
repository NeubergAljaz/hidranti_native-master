import { THEME_CHANGE } from './constants';
import {lightTheme} from '../styles/ThemesStyle';

// Initially we will have a light mode
const initialState = {
    mode: 'light',
    style: lightTheme
};

// Handle our action of changing the theme
const themeReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case THEME_CHANGE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default themeReducer;