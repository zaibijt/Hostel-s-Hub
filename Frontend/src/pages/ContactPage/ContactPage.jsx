import ContactContent from "../../component/ContactSections/ContactContent/ContactContent";
import ContactCard from "../../component/ContactSections/ContactCard/ContactCard";
import ContactBaner from "../../component/ContactSections/ContactBanner/ContactBaner";
// import Meta from "../../components/Meta/Meta";
import Nav from "../../component/common/nav/Nav.tsx";
import Footer from "../../component/common/footer/Footer.tsx";
function ContactPage() {
  return (
    <>
      <Nav />
      <div>
        {/* <Meta title="GameUnite || ContactUs" /> */}
        <ContactBaner />
        <ContactContent />
        <ContactCard />
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
