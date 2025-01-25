import { StaticImageData } from "next/image";
import Image from 'next/image';
import TeamImage1 from '@/img/about/team-1.jpg'
import TeamImage2 from '@/img/about/team-2.jpg'
import TeamImage3 from '@/img/about/team-3.jpg'
import TeamImage4 from '@/img/about/team-4.jpg'

interface TeamMember {
    name: string;
    role: string;
    image: StaticImageData;
  }
const Team = () => {
    const team: TeamMember[] = [
      { name: "John Smith", role: "Fashion Design", image: TeamImage1 },
      { name: "Christine Wise", role: "C.E.O", image: TeamImage2 },
      { name: "Sean Robbins", role: "Manager", image: TeamImage3 },
      { name: "Lucy Myers", role: "Delivery", image: TeamImage4 },
    ];
  
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-red-600 text-sm font-bold uppercase tracking-wider block mb-4">Our Team</span>
            <h2 className="text-4xl font-bold text-gray-900">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full mb-6"
                  layout="responsive"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <span className="text-gray-500">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  export default Team;