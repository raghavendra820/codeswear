import { Carousel } from "@material-tailwind/react";

 export default  function  CarouselDefault() {
  return (
    <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img class="object-cover object-center rounded" alt="hero" src="./cover.jpg"/>
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 gradient-text">Discover Your Style,
       Define Your Look
      </h1>
      <p class="mb-8 leading-relaxed">Welcome to our vibrant world of fashion! Discover the latest trends and timeless classics at our online cloth store. Dive into a kaleidoscope of colors, textures, and styles that reflect your unique personality. From chic dresses to comfortable loungewear, we curate a diverse collection to cater to every occasion and mood. Elevate your wardrobe with premium fabrics and impeccable craftsmanship, ensuring both style and comfort. Whether you're seeking casual essentials or statement pieces, our carefully curated selection offers something for every fashion-forward individual. Experience the joy of effortless shopping and express your individuality with our range of high-quality garments. Explore now and redefine your style journey!</p>
      <div class="flex justify-center">
      </div>
    </div>
  </div>
</section>
  );
}