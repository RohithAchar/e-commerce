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
  const [totalAmount, setTotalAmount] = useState(0);

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
    if (cartItems.length === 0) {
      let selectedItem = items.find((item) => item.id == id);
      selectedItem = { ...selectedItem, qty: 1 };
      setCartItems([selectedItem]);
      return;
    }
    if (cartItems.length !== 0) {
      if (cartItems.find((item) => item.id == id)) {
        const modified = cartItems.map((item) => {
          if (item.id == id) {
            let qty = item.qty + 1;
            return { ...item, qty: qty };
          }
          return item;
        });
        setCartItems([...modified]);
      } else {
        let selectedItem = items.find((item) => item.id == id);
        selectedItem = { ...selectedItem, qty: 1 };
        setCartItems([...cartItems, selectedItem]);
      }
    }
  };

  const updateQuantity = (id, qty) => {
    if (qty == 0 || qty > 3) {
      return;
    }
    const updated = cartItems.map((item) => {
      if (item.id == id) return { ...item, qty };
      return item;
    });
    setCartItems([...updated]);
  };

  const updateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => (total += item.price * item.qty));
    setTotalAmount(total);
  };
  useEffect(() => {
    updateTotalAmount();
  }, [cartItems]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };
  const handleDeleteCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id != id));
  };

  if (loading) <PropagateLoader color="#000" />;

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
      {isCartOpen && (
        <div className="absolute right-0 top-16 w-96 bg-slate-200">
          <button
            className="cursor-pointer w-16 h-10 "
            onClick={handleCloseCart}
          >
            X
          </button>
          {cartItems.length === 0 ? (
            <h2 className="text-2xl">Empty Cart</h2>
          ) : (
            <div className="pl-16">
              {cartItems.map((item) => {
                return (
                  <Card
                    key={item.id}
                    item={item}
                    isCart={true}
                    handleQtyInput={updateQuantity}
                    handleDelete={handleDeleteCartItem}
                  />
                );
              })}
            </div>
          )}
          <div className="pt-10">
            <p className="font-bold">Total amount: ${totalAmount}</p>
            <button className="border-solid w-full border-2 p-5 rounded-sm bg-black text-white hover:bg-slate-800">
              Buy All
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
