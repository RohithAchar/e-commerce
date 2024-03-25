import { useEffect, useState } from "react";
import Card from "./Card";
import { PropagateLoader } from "react-spinners";

const Products = ({ isHome }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) <PropagateLoader color="#000" />;
  return (
    <section className="products py-10 text-center bg-slate-100 sm:px-10">
      <h2 className="text-4xl">Trending</h2>
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
              return <Card key={item.id} item={item} />;
          })
        ) : (
          items.map((item) => {
            return <Card key={item.id} item={item} />;
          })
        )}
      </div>
    </section>
  );
};

export default Products;
