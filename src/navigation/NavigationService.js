import { useNavigationContainerRef } from "@react-navigation/native";

 export const navigationRef = useNavigationContainerRef();

 export const navigate = (name, params) => {
    if(navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    } else {
        console.warn('Navigator is not ready yet!');
    }
 }