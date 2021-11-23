import { url } from "inspector";

export function Header () {
  
  return (
    <nav className="fixed px-16 z-50 flex justify-between bg-white py-4 w-full shadow-md">
      <div>
        <img className="w-12" src="https://myleague.vn/uploadfiles/leagues/avatar/e14c0b08794f1fd849edca887633a99e.png" alt="logo" />
      </div>
      <div className="-mb-px flex justify-center">
          <a className="header-item" href="#">
              Home
          </a>
          <a className="header-item" href="#">
              Products
          </a>
          <a className="header-item" href="#">
              Discounts
          </a>
          <a className="header-item" href="#">
              Customers
          </a>
      </div>
    </nav>
  );
}
