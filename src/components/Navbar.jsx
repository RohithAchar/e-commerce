import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white px-3 py-1 rounded-sm"
      : "px-3 py-1 rounded-sm";
  return (
    <nav className="flex justify-around py-5">
      <div>
        <h1>B</h1>
      </div>
      <ul className="flex gap-10">
        <li>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopAll" className={linkClass}>
            Shop all
          </NavLink>
        </li>
      </ul>
      <div>
        <NavLink to="/cart">cart</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
