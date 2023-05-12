import { THEME_CHANGE } from './constants';
import {lightTheme} from '../styles/ThemesStyle';

interface ThemeState {
    mode: string;
    style: any;
  }
// Initially we will have a light mode
const initialState: ThemeState = {
    mode: 'light',
    style: lightTheme,
  };

// Handle our action of changing the theme
const themeReducer = (state: ThemeState = initialState, action: any) => {
    
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