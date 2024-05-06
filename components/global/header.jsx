"use client";
import React,{useState} from "react";
export default function Header() {
    const [category, setCategory] = useState('');
  return (
    <header className="bg bg-slate-600">
      <div className="w-screen">
        <div className="flex flex-row pt-4 justify-center text-center mb-4">
          <div className="w-1/5 text-start">
            <h2 className="text-5xl font-extrabold">XYZ</h2>
          </div>
          <div className="w-1/2">
            <label class="input input-bordered flex items-center gap-2 bg-slate-400">
              <input type="text" class="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="w-1/4 flex flex-row justify-evenly">
            <div>
                <button className="btn btn-ghost">Sign Up</button>
            </div>
            <div>
                <button className="btn btn-ghost">Cart</button>    
            </div>            
          </div>
        </div>
        <section className="flex flex-row justify-evenly bg bg-slate-500">
            <div><button className="btn btn-ghost">Best Seller</button></div>
            <div><button className="btn btn-ghost">Home</button></div>
            <div><button className="btn btn-ghost">Electronic</button></div>
            <div><button className="btn btn-ghost">Health Care</button></div>
        </section>
      </div>
    </header>
  );
}
