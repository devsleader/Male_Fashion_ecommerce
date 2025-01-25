import AboutImg from '@/img/about/about-us.jpg'
import Image from 'next/image'

interface AboutItemProps {
    title: string;
    description: string;
  }
  
  const AboutItem = ({ title, description }: AboutItemProps) => (
    <div className="mb-8 md:mb-0">
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  
  const AboutSection = () => {
    return (
      <section className="py-20">
        <div className="container">
          <div className="mb-12">
            <Image 
              src={AboutImg} 
              alt="About Us" 
              className="w-full" 
              layout="responsive"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AboutItem 
              title="Who We Are ?"
              description="Contextual advertising programs sometimes have strict policies that need to be adhered too. Let's take Google as an example."
            />
            <AboutItem 
              title="Who We Do ?"
              description="In this digital generation where information can be easily obtained within seconds, business cards still have retained their importance."
            />
            <AboutItem 
              title="Why Choose Us"
              description="A two or three storey house is the ideal way to maximise the piece of earth on which our home sits, but for older or infirm people."
            />
          </div>
        </div>
      </section>
    );
  };
  export default AboutSection;