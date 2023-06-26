"use client"
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import styles from "../styles/Navbar.module.css"

export default function Navbar() {

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('myNavbar');
      if (window.scrollY > 0) {
        navbar.style.backgroundColor = 'rgb(211 211 211)'; 
        navbar.style.transition = 'all 0.3s'; 
      } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.transition = 'all 0.3s'; 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const router=useRouter()
  return (
    <nav>
      <div className={styles.navbar}  id="myNavbar">
        <img className={styles.logo} onClick={()=>{router.push("/")}} style={{"cursor":"pointer"}} src="/images/logo-white.png" alt="Tricky Travellers" />
        <ul className={styles.nav_links}>
          <li><a href="/forums">Forums</a></li>
          <li><a href="/create">Create</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/stays">Stays</a></li>
          <li><a href="/blogs">Blogs</a></li>
          <button className="navbtn"><a href="/profile" style={{color:"white"}}>Sign in</a></button>
        </ul>
      </div>
    </nav>
  );
}
