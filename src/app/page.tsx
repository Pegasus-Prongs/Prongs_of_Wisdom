import React, {Suspense} from "react";
import Carousel from "@/components/Carousel";
import CarouselItem from "@/components/CarouselItem";
import Analysis from "./sections/Analysis";
import { PopularLatestPosts } from "./sections/PopularLatestPosts";
import TopUsers from "./sections/TopUsers";
export default function Home() {
  return (
    <>
      <main className="max-w-6xl m-auto flex flex-col items-center justify-between p-12">
        <Carousel>
          <CarouselItem>
            <img src="/slider_bg.png" alt="Slide 1" className="w-full h-full object-cover" />
          </CarouselItem>
          <CarouselItem>
            <img src="/slider_bg.png" alt="Slide 2" className="w-full h-full object-cover" />
          </CarouselItem>
          <CarouselItem>
            <img src="/slider_bg.png" alt="Slide 3" className="w-full h-full object-cover" />
          </CarouselItem>
        </Carousel>
        <PopularLatestPosts />
        <Analysis />
        <TopUsers />
      </main>
    </>
  );
}
