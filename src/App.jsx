
import EnquiryPopup from "./components/EnquiryPopup";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutProject from "./components/AboutProject";
// import ProjectVideo from "./components/ProjectVideo";
import WhyUs from "./components/WhyUs";
import Amenities from "./components/Amenities";
import LifestyleBanner from "./components/LifestyleBanner";
// import Location from "./components/Location";
import LocationAdvantages from "./components/LocationAdvantages";
import HomeLoan from "./components/HomeLoan";
import FAQ from "./components/FAQ";
import SiteVisit from "./components/SiteVisit";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <AboutProject />
 {/**<ProjectVideo /> */} 
   <WhyUs />
     <Amenities />
     <LifestyleBanner />
      {/* <Location /> */}
      <LocationAdvantages />
         <HomeLoan />
       <FAQ />
         <SiteVisit />
      
  <Footer />
        {/* Other sections will go here */}
      </main>
           <EnquiryPopup />
    </>
  );
}

export default App;
