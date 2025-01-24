import AboutSection  from "@/components/AboutSection";
import Breadcrumb from "@/components/Breadcrumb";
import Team from "@/components/Team";
import Client from "@/components/Client";
import  Testimonial  from "@/components/Testimonial";
import  Counter  from "@/components/Counter";

export default function about() {
  return (
    <>
      <Breadcrumb pageTitle="About Us" currentPage="About" />
      <AboutSection />
      <Testimonial />
      <Counter />
      <Team />
      <Client />
    </>
  );
}