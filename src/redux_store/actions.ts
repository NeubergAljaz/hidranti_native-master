import { THEME_CHANGE } from "./constants";

// switch mode according to what is specified...
export const switchMode = (mode:any) => {
    
    return {
        type: THEME_CHANGE,
        payload: mode,
    };
};