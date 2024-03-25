import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Products from "../components/Products";
const HomePage = () => {
  return (
    <>
      <Hero />
      <Products isHome={true} />
      <Footer />
    </>
  );
};

export default HomePage;
