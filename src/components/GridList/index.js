import useStyles from "./style";
import { Grid } from "@material-ui/core";
import classNames from "classnames";

const GridList = ({
  data = [],
  className = {},
  ItemComponent,
  itemProps = {},
  gridContainerProps = {},
  gridItemProps = {},
}) => {
  const styles = useStyles();
  const containerStyle = classNames(styles.container, className);
  if (!ItemComponent) return null;

  return (
    <Grid
      container
      spacing={1}
      className={containerStyle}
      {...gridContainerProps}
    >
      {data.map((item, index) => (
        <Grid item xs={6} key={index} {...gridItemProps}>
          <ItemComponent {...item} {...itemProps} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridList;