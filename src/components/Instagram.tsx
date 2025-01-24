import { StaticImageData } from 'next/image';
import React from 'react';
import InstagramImage1 from '@/img/instagram/instagram-1.jpg'
import InstagramImage2 from '@/img/instagram/instagram-2.jpg'
import InstagramImage3 from '@/img/instagram/instagram-3.jpg'
import InstagramImage4 from '@/img/instagram/instagram-4.jpg'
import InstagramImage5 from '@/img/instagram/instagram-5.jpg'
import InstagramImage6 from '@/img/instagram/instagram-6.jpg'

interface InstagramImage {
  id: number;
  url: StaticImageData;
}

const Instagram: React.FC = () => {
  const instagramImages: InstagramImage[] = [
    { id: 1, url: InstagramImage1 },
    { id: 2, url: InstagramImage2 },
    { id: 3, url: InstagramImage3 },
    { id: 4, url: InstagramImage4 },
    { id: 5, url: InstagramImage5 },
    { id: 6, url: InstagramImage6 },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 gap-1">
              {instagramImages.map((image) => (
                <div
                  key={image.id}
                  className="h-[261px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${image.url.src})` }}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="pt-32">
              <h2 className="text-4xl font-bold mb-8">Instagram</h2>
              <p className="text-[#3d3d3d] mb-16">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
              <h3 className="text-[#e53637] text-2xl font-bold">#Male_Fashion</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;