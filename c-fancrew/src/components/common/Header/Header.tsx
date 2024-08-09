import React from "react";

const Header = () => {
  return (
    <div className="bg-[#f3f3f3]">
      <ul className="mx-auto flex py-1.5 max-w-[1024px] justify-end flex-wrap">
        <li>
          <a
            className="text-[1.2rem] text-[#0066cc] after:content-['|'] after:text-[1.2rem] after:px-[0.4rem]"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "inherit;" }}
            href=""
          >
            調査をご検討の方はこちら
          </a>
        </li>
        <li>
          <a
            className="text-[1.2rem] text-[#0066cc]"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "inherit;" }}
            href=""
          >
            運営会社
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
