import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
export const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
export const STATUS_BAR_HEIGHT = getStatusBarHeight()
export const API_KEY = "AIzaSyB1sp0OkIUChWZre2OEKr2e0W-nPSb9ZBI"