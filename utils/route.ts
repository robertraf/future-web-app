import { headerNames } from "@/constants/header";

export const routeNameParser = ({ route }) => {
  return headerNames.find((headerName) => headerName.route === route)?.name;
};
