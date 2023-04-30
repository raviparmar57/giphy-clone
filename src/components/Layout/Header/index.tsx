import Link from "next/link";
import React, { useState } from "react";

function Header() {
  return (
    <div className="container mx-auto">
      <nav className="flex items-center justify-center flex-wrap bg-white py-4 lg:px-24 shadow border-solid border-t-4 border-blue-700">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <span className="font-semibold text-xl tracking-tight">
              <Link href="/"> Giphy Clone</Link>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
