import React from "react";
import "./modules.css";
import Typewriter from "../components/TypeWritter";
import SocialLink from "../components/SocialLink";
import { SocialIcons } from "../assets/icons";
import ProfilePhoto from "../components/Profile";
import yo from '../assets/yoSevilla.jpg';


const Home = () => {
  return (
    <div className="home">
      <section className="title">
        <Typewriter
          texts={["Hola, Soy Yago👋", "Soy un desarrollador FullStack"]}
          speed={70}
          pause={1500}
        />
      </section>
       <ProfilePhoto 
        imageSrc={yo}
        altText="Yago Calero - Desarrollador Full Stack"
      />
      <section className="socials-container">
        <SocialLink url="https://linkedin.com/in/yagocr" icon={SocialIcons.linkedin} label={"Linkedin"} />
        <SocialLink url="https://github.com/yagocr2" icon={SocialIcons.github} label={"Github"} />
        <SocialLink url="" icon={SocialIcons.email} label={"Mail"} />
      </section>
      <section>
        <p className="subtitle">
          Desarrollador FullStack con experiencia en Java, C#, .NET, y bases de
          datos. Me apasiona crear aplicaciones web modernas y eficientes.
        </p>
      </section>
    </div>
  );
};

export default Home;
