import React from "react";
import styles from "../styles/Blogs.module.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { pink } from "@mui/material/colors";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Blogs = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={styles.container}>
      <div className={styles.Heading}>
        <h1>Latest Blogs</h1>
        <img src="/images/wave.svg" alt="" />
        <p>
          Discover blogs shared by fellow travellers and writers that are
          intriguing, and informative. Re-educate yourself about traveling and
          nature with us. Unlock the world's secrets discovering new <br /> ones
          and sharing yours.
        </p>
      </div>
      <div className={styles.cards}>
        <Card sx={{ maxWidth: 345, m: "1rem" }}>
          <CardMedia
            component="img"
            height="194"
            image="/images/discover.jpg"
            alt="Paella dish"
          />
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="64 views  |  2 days ago"
          />
          <CardContent>
            <Typography
              variant="body1"
              color="text"
              sx={{ fontWeight: "bold" }}
            >
              Exploring the Trans-Tasman Bond: Unveiling the Unique Connection
              between Australia and New Zealand
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ color: pink[500] }} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon color="success" />
            </IconButton>
            <ExpandMore aria-label="show more">
              <ExpandMoreIcon color="success" />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="194"
            image="/images/discover.jpg"
            alt="Paella dish"
          />
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="64 views  |  2 days ago"
          />
          <CardContent>
            <Typography
              variant="body1"
              color="text"
              sx={{ fontWeight: "bold" }}
            >
              Exploring the Trans-Tasman Bond: Unveiling the Unique Connection
              between Australia and New Zealand
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ color: pink[500] }} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon color="success" />
            </IconButton>
            <ExpandMore aria-label="show more">
              <ExpandMoreIcon color="success" />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Card sx={{ maxWidth: 345, m: "1rem" }}>
          <CardMedia
            component="img"
            height="194"
            image="/images/discover.jpg"
            alt="Paella dish"
          />
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="64 views  |  2 days ago"
          />
          <CardContent>
            <Typography
              variant="body1"
              color="text"
              sx={{ fontWeight: "bold" }}
            >
              Exploring the Trans-Tasman Bond: Unveiling the Unique Connection
              between Australia and New Zealand
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ color: pink[500] }} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon color="success" />
            </IconButton>
            <ExpandMore aria-label="show more">
              <ExpandMoreIcon color="success" />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
      <div style={{ marginTop: "1rem", marginRight: "1.5rem", marginBottom:"3rem" }}>
        <button className={styles.load} role="button">
          <span class={styles.text}>Load more</span>
        </button>
      </div>
        <div className={styles.Heading}>
          <h1>Best in Delhi NCR</h1>
          <img src="/images/wave.svg" alt="" />
        </div>
        <section className={styles.cardsSection}>
          <div className={styles.cardsDiv}>
            <div className={styles.cardRow}>
              <div className={styles.Card}>
                <a href=""></a>
                <div className={styles.like}><img src="/images/like.svg" alt="" /></div>
                <div className={styles.cardImg}><img src="/blog1.webp" alt="" /></div>
                <div className={styles.cardText}>
                    <h3>Day Outing</h3>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h4>Day Outing</h4>
                        <img src="/images/location.svg" alt="" />
                        Tikri Gurgaon
                    </div>
                    <div className={styles.line}></div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img src="/images/calender.svg" alt="" />
                        Aug 1, 2023
                        <div className={styles.rate}>₹999</div>
                    </div>
                </div>
              </div>
              <div className={styles.Card}>
                <a href=""></a>
                <div className={styles.like}><img src="/images/like.svg" alt="" /></div>
                <div className={styles.cardImg}><img src="/blog1.webp" alt="" /></div>
                <div className={styles.cardText}>
                    <h3>Day Outing</h3>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h4>Day Outing</h4>
                        <img src="/images/location.svg" alt="" />
                        Tikri Gurgaon
                    </div>
                    <div className={styles.line}></div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img src="/images/calender.svg" alt="" />
                        Aug 1, 2023
                        <div className={styles.rate}>₹999</div>
                    </div>
                </div>
              </div>
              <div className={styles.Card}>
                <a href=""></a>
                <div className={styles.like}><img src="/images/like.svg" alt="" /></div>
                <div className={styles.cardImg}><img src="/blog1.webp" alt="" /></div>
                <div className={styles.cardText}>
                    <h3>Day Outing</h3>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h4>Day Outing</h4>
                        <img src="/images/location.svg" alt="" />
                        Tikri Gurgaon
                    </div>
                    <div className={styles.line}></div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img src="/images/calender.svg" alt="" />
                        Aug 1, 2023
                        <div className={styles.rate}>₹999</div>
                    </div>
                </div>
              </div>
              <div className={styles.Card}>
                <a href=""></a>
                <div className={styles.like}><img src="/images/like.svg" alt="" /></div>
                <div className={styles.cardImg}><img src="/blog1.webp" alt="" /></div>
                <div className={styles.cardText}>
                    <h3>Day Outing</h3>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h4>Day Outing</h4>
                        <img src="/images/location.svg" alt="" />
                        Tikri Gurgaon
                    </div>
                    <div className={styles.line}></div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img src="/images/calender.svg" alt="" />
                        Aug 1, 2023
                        <div className={styles.rate}>₹999</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{ marginTop: "1rem", marginRight: "1.5rem", marginBottom:"3rem" }}>
        <button className={styles.load} role="button">
          <span class={styles.text}>Load more</span>
        </button>
      </div>
      </div>
  );
};

export default Blogs;
