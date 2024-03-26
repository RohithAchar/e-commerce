import Hero from "../components/Hero";
import Products from "../components/Products";
const HomePage = () => {
  return (
    <>
      <Hero />
      <Products isHome={true} />
    </>
  );
};

export default HomePage;
