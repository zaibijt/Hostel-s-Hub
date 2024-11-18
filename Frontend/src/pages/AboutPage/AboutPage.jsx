import AddCards from "../../component/AboutSections/AddCards/AddCards";
import Content from "../../component/AboutSections/Content/Content";
import Banner from "../../component/AboutSections/Banner/Baner";
import Nav from "../../component/common/nav/Nav.tsx";
import Footer from "../../component/common/footer/Footer.tsx";
// import OurMission from "../../components/AboutSections/Mission/OurMission";
// import Meta from "../../components/Meta/Meta";
function AboutPage() {
  return (
    <>
      {/* <Meta title=" || About" /> */}
      <Nav />
      <div style={{ marginBottom: "20px" }}>
        <Banner />
      </div>

      <div style={{ marginTop: "40px" }}>
        <Content />
      </div>

      {/* <div className="OurMission">
        <OurMission />
      </div> */}

      <div style={{ marginBottom: "60px" }}>
        <AddCards />
      </div>

      <Footer />
    </>
  );
}

export default AboutPage;
