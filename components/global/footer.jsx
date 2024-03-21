export default function Footer() {
  return (
    <footer className="bg bg-slate-600">
      <section>
        <section className="text-center bg bg-slate-500 py-24">
          <quote className="text-3xl font-bold text-black">
            SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.
          </quote>
        </section>
        <div className="w-full flex justify-center py-16">
          <section className="flex flex-row w-5/6 h-auto">
            <div className="flex justify-evenly w-full">
              <div>
                <section className="flex flex-col text-center">
                  <div>
                    <span className="font-bold text-5xl text-black">XYZ</span>
                  </div>
                  <div>The best look anytime, anywhere.</div>
                </section>
              </div>
              <div className="flex flex-col justify-center text-center mb-3">
                <div>
                  <span className="font-bold text-3xl text-black">For Her</span>
                </div>
                <nav>
                  <div>
                    <a class="link link-hover">Women Jeans</a>
                  </div>
                  <div>
                    <a class="link link-hover">Tops and Shirts</a>
                  </div>
                  <div>
                    <a class="link link-hover">Coats and Jackets</a>
                  </div>
                  <div>
                    <a class="link link-hover">Women Accessories</a>
                  </div>
                </nav>
              </div>

              <div className="flex flex-col justify-center text-center mb-3">
                <div>
                  <span className="font-bold text-3xl text-black">For Him</span>
                </div>
                <nav>
                  <div>
                    <a class="link link-hover">Men Jeans</a>
                  </div>
                  <div>
                    <a class="link link-hover">Men Shoes</a>
                  </div>
                  <div>
                    <a class="link link-hover">Men Shirts</a>
                  </div>
                  <div>
                    <a class="link link-hover">Men Accessories</a>
                  </div>
                </nav>
              </div>
              <div>
                <div>
                  <span className="font-bold text-3xl text-black">
                    Subscribe
                  </span>
                </div>
                <div>
                  <label class="input input-bordered flex items-center gap-2 bg bg-slate-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" class="grow" placeholder="Email" />
                  </label>
                </div>
                <div>
                  <button className="btn btn-ghost mt-3">Subscribe</button>
                </div>
              </div>
              <div>
                <div>
                  <span className="font-bold text-3xl text-black">Contact</span>
                </div>
                <div>
                  <div>Address: 123 XYZ Street</div>
                  <div>Phone: 123-456-7890</div>
                  <div>Email:</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </footer>
  );
}
