import { makeStyles } from "@material-ui/core";
import {
  CreateBorder,
  CreatePadding,
  CreateMargin,
  FlexRow,
  Centering,
  FlexColumn
} from "@theme/mixins";
import { GRAY_PRIMARY } from "@theme/colors";

export default makeStyles(theme => ({
  container: {
    ...CreatePadding(15, 0, 15, 0),
    ...CreateMargin(10, 0, 10, 0),
    ...FlexColumn,
    ...CreateBorder(0, 0, "1px", 0, GRAY_PRIMARY)
  },
  header: {
    ...FlexRow,
    alignItems: "center",
    justifyContent: "space-between"
  },
  customerContainer : {
      ...FlexRow,
      alignItems : 'center'
  },
  imgContainer : {
      borderRadius : 100,
      width : 43,
      height : 43,
      ...Centering,
      backgroundColor : GRAY_PRIMARY
  },
  customerProfile : {
    ...FlexColumn,
    ...CreatePadding(0,0,0,10)
  },
  content : {
      ...CreateMargin(10,0,0,0),
  }
}));
