import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { Chip, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import moment from "moment";
const theme = createTheme({
  typography: {
    fontFamily: ["Ubuntu Condensed"].join(","),
  },
});
const CardType = ({ item }) => {
  function descriptionLength(str) {
    if (str.length > 45) {
      str = str.substring(0, 45) + "....";
    }
    return str;
  }
  return (
    <ThemeProvider theme={theme}>
      <Card className="m-2" sx={{ maxWidth: 400 }}>
        <CardHeader
          title={`${item.name}`}
          subheader={`${moment(item.createdAt).format("DD-MMM-YYYY")}`}
        />

        <CardMedia
          component="img"
          height="140"
          image={`${item.imageFile}`}
          alt="green iguana"
        />
        <Stack className=" mt-3 mx-1" direction="row" spacing={1}>
          {item.tags.map((el, i) => {
            return <Chip key={i} label={`${el}`} />;
          })}
        </Stack>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${item.title}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${descriptionLength(item.description)}`}
          </Typography>
        </CardContent>

        <CardActions className="mb-3">
          <Link
            style={{
              fontFamily: "Ubuntu Condensed",
            }}
            to={`/blog/${item._id}`}
            size="small"
            className="btn btn-outline-dark"
          >
            LEARN MORE
          </Link>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default CardType;
