import React, {useState} from 'react';
import { links } from "./destinations";
import styles from "../styles/Home.module.css";

const Destination = () => {
  return (
    <div className={styles.Destination + " " +styles.container}>
      <h1>
        Destination
        </h1>
        <img src="/images/wave.svg" alt="" style={{marginBottom:"2rem"}}/>
        <div className={styles.destination}>
          <div className={styles.row}>
              <div style={{borderRadius:"20px", padding: "0.5rem", display:"flex"}} >
                <a style={{objectFit:"contain", color:"rgb(255, 255, 255)", position:"relative"}}>
                  <img src="/rajasthan.webp" alt="" className={styles.rajas}/>
                  <div className={styles.Rajasthan}>Rajasthan
                  <p>Stunning forts and havelis; admirable people music; heap stories of gallantry and mouth-watering food invite you to the socially well off province of Rajasthan</p>
                  </div>
                </a>
              </div>
              <div className={styles.destination}>
                <div className={styles.row}>
                  <div className={styles.subdiv}>
                    <a href="">
                      <img src="/himachal.webp" alt=""  className={styles.tour}/>
                      <div>Himachal</div>
                    </a>
                    <a href="">
                      <img src="/delhi.webp" alt="" className={styles.tour}/>
                      <div>Delhi</div>
                    </a>
                  </div>
                  <div className={styles.subdiv}>
                  <a href="">
                      <img src="/sikkim.webp" alt="" className={styles.tour}/>
                      <div>Sikkim</div>
                    </a>
                    <a href="">
                      <img src="/uttarakhand.webp" alt="" className={styles.tour}/>
                      <div>Uttarakhand</div>
                    </a>
                  </div>
                  <div className={styles.subdiv}>
                  <a href="">
                      <img src="/kerala.webp" alt="" className={styles.tour}/>
                      <div>Kerala</div>
                    </a>
                    <a href="">
                      <img src="/chattisgarh.webp" alt="" className={styles.tour}/>
                      <div>Chattisgarh</div>
                    </a>
                  </div>
                </div>
                
              </div>
          </div>
          <div style={{marginTop:"1rem" , marginRight:"3.5rem"}}>
                <button className={styles.load} role="button"><span class={styles.text}>Load more</span></button>
                </div>
        </div>
    </div>
  )
}

export default Destination