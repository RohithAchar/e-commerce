import { useEffect, useState } from "react";
import Card from "./Card";
import { PropagateLoader } from "react-spinners";

const Products = ({ isHome }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState("ALL PRODUCTS");
  const [url, setUrl] = useState("https://fakestoreapi.com/products");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        setHeading("Check your connection !");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    if (isHome) setHeading("Trending");
  }, []);

  const handleSelect = (e) => {
    const category = e.target.value;
    setUrl(`https://fakestoreapi.com/products/category/${e.target.value}`);
    setLoading(true);
    setHeading(category.toUpperCase());
  };

  const handleClick = (id) => {
    const item = items.filter((item) => item.id == id);
    setCartItems([...cartItems, ...item]);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  if (loading) <PropagateLoader color="#000" />;

  console.log(isCartOpen);

  return (
    <section className="products py-10 text-center bg-slate-100 sm:px-10">
      {!isHome && (
        <select onChange={handleSelect} className="mb-5">
          <option value="">--Filter by category--</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's clothings</option>
          <option value="women's clothing">Women's clothings</option>
        </select>
      )}
      {isHome ? (
        <h2 className="text-4xl">{heading}</h2>
      ) : (
        <h2 className="text-4xl">{heading}</h2>
      )}
      <div className="pt-5 card-container flex justify-center flex-wrap gap-10">
        {loading ? (
          <PropagateLoader color="black" />
        ) : isHome ? (
          items.map((item) => {
            if (
              item.id === 1 ||
              item.id === 5 ||
              item.id === 10 ||
              item.id === 17
            )
              return (
                <Card key={item.id} item={item} handleClick={handleClick} />
              );
          })
        ) : (
          items.map((item) => {
            return <Card key={item.id} item={item} handleClick={handleClick} />;
          })
        )}
      </div>
      <div
        className="absolute top-5 right-[12%] cursor-pointer"
        onClick={handleCartClick}
      >
        cart {cartItems.length}
      </div>
    </section>
  );
};

export default Products;
