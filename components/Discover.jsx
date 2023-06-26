'use client';

import React , {useState} from "react";
import styles from "../styles/Home.module.css";
import { links } from "./image_links";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

const Discover = () => {
    const [selectedFilter, setSelectedFilter] = useState();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={styles.Discover +" "+ styles.container}>
      <h1>Discover</h1>
      <img src="/images/wave.svg" alt="" />
      <div></div>
      <div className={styles.Images}>
        <Box
          sx={{ maxWidth: { md: 950, lg: 1310 }, bgcolor: "background.paper" }}
        >
          <Tabs
            className={styles.MuiTabsscrollButtons}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            {links.map((item, index) => (
             <div className={styles.scrolldiv }> 
             <div
                key={index}
                className= {styles.img_div}
              >
                <img src={item.imgSrc} className="links-img" />
              </div>
                  <div className={styles.nameDiv}>

                      {item.label}
                  </div>
                  </div>
            ))}
          </Tabs>
        </Box>
      </div>
    </div>
  );
};

export default Discover;
