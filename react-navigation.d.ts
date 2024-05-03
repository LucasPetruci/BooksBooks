import { NavigationProp, ParamListBase } from "@react-navigation/native";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamListBase {
      ForYou: undefined; // Adicione suas outras rotas aqui
    }
  }
}

export function useNavigation<
  T extends NavigationProp<ReactNavigation.RootParamList>
>(): T;
