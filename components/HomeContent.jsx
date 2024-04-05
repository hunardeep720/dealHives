import React from "react";
import Space from "./Space";
import image from "./HomeImage";
import CategoryImage from "./CategoryImage";
function HomeContent() {
  return (
    <div className="mx-auto w-auto mb-12 relative">
      <Space />
      <div className="relative grid gap-4 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6">
      <div>
      <CategoryImage sourceImg={image[0].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[1].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[2].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[3].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[4].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[5].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[6].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[7].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[8].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[9].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[10].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[11].image} />
     </div>
      </div>
    </div>
  );
}

export default HomeContent;
