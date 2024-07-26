import { AppRegistry } from "react-native";
import ReduxProviderRootComponent from "./ReduxProviderRootComponent";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => ReduxProviderRootComponent);
