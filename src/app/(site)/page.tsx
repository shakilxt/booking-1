import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Intro } from "@/components/home/intro";
import { FeaturedRooms } from "@/components/home/featured-rooms";
import { Amenities } from "@/components/home/amenities";
import { Experiences } from "@/components/home/experiences";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { Testimonials } from "@/components/home/testimonials";
import { Location } from "@/components/home/location";
import { Faq } from "@/components/home/faq";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <FeaturedRooms />
      <Amenities />
      <Experiences />
      <GalleryPreview />
      <Testimonials />
      <Location />
      <Faq />
      <Newsletter />
    </>
  );
}
