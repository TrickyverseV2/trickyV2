import React from "react";
import styles from "../styles/Blogs.module.css";
import YouTube from "react-youtube";

const Events = () => {
  const videoId = "gljQOWdIHhw";
  const opts = {
    width: "1000",
    height: "415",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <div className={styles.container} style={{ marginTop: "0" }}>
        <div className={styles.Heading}>
          <h1>Events</h1>
          <img src="/images/wave.svg" alt="" />
        </div>
        <section className={styles.cardsSection}>
          <div className={styles.cardsDiv}>
            <div className={styles.cardRow}>
              <div className={styles.Card1}>
                <a href=""></a>
                <div className={styles.cardImg1}>
                  <img src="/blog1.webp" alt="" />
                </div>
                <div className={styles.cardText1}>
                  <h3>Day Outing</h3>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/images/location.svg" alt="" />
                    Tikri Gurgaon
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.4rem",
                      textAlign: "center",
                    }}
                  >
                    The event will take place on Aug 1, 2023 <br /> Starting
                    From
                  </div>
                  <div className={styles.rate1}>₹999</div>
                  <button className={styles.button41} role="button">
                    Book Now
                  </button>
                </div>
              </div>
              <div className={styles.Card1}>
                <a href=""></a>
                <div className={styles.cardImg1}>
                  <img src="/blog1.webp" alt="" />
                </div>
                <div className={styles.cardText1}>
                  <h3>Day Outing</h3>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/images/location.svg" alt="" />
                    Tikri Gurgaon
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.4rem",
                      textAlign: "center",
                    }}
                  >
                    The event will take place on Aug 1, 2023 <br /> Starting
                    From
                  </div>
                  <div className={styles.rate1}>₹999</div>
                  <button className={styles.button41} role="button">
                    Book Now
                  </button>
                </div>
              </div>
              <div className={styles.Card1}>
                <a href=""></a>
                <div className={styles.cardImg1}>
                  <img src="/blog1.webp" alt="" />
                </div>
                <div className={styles.cardText1}>
                  <h3>Day Outing</h3>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/images/location.svg" alt="" />
                    Tikri Gurgaon
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.4rem",
                      textAlign: "center",
                    }}
                  >
                    The event will take place on Aug 1, 2023 <br /> Starting
                    From
                  </div>
                  <div className={styles.rate1}>₹999</div>
                  <button className={styles.button41} role="button">
                    Book Now
                  </button>
                </div>
              </div>
              <div className={styles.Card1}>
                <a href=""></a>
                <div className={styles.cardImg1}>
                  <img src="/blog1.webp" alt="" />
                </div>
                <div className={styles.cardText1}>
                  <h3>Day Outing</h3>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/images/location.svg" alt="" />
                    Tikri Gurgaon
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.4rem",
                      textAlign: "center",
                    }}
                  >
                    The event will take place on Aug 1, 2023 <br /> Starting
                    From
                  </div>
                  <div className={styles.rate1}>₹999</div>
                  <button className={styles.button41} role="button">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          style={{
            marginTop: "1rem",
            marginRight: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <button className={styles.load} role="button">
            <span class={styles.text}>Load more</span>
          </button>
        </div>
      </div>
      <div className={styles.videoBanner}>
        <div className={styles.Banner}>
          <div className={styles.backBanner}>
            <img src="/images/bg1.webp" alt="" style={{ width: "84.2rem" , opacity:"0.9"}} />
          </div>
          <div className={styles.videobanner}>
            <div className={styles.videoheading}>Watch Our Video Tour
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <YouTube videoId={videoId} opts={opts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
