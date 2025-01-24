// components/Client.tsx
import client1 from '@/img/clients/client-1.png';
import client2 from '@/img/clients/client-2.png';
import client3 from '@/img/clients/client-3.png';
import client4 from '@/img/clients/client-4.png';
import client5 from '@/img/clients/client-5.png';
import client6 from '@/img/clients/client-6.png';
import client7 from '@/img/clients/client-7.png';
import client8 from '@/img/clients/client-8.png';
import Image from 'next/image';

// const clientImages = [client1, client2, client3, client4, client5, client6, client7, client8 ];

const clientData = [
  { id: 1, name: 'Client 1', image: client1 },
  { id: 2, name: 'Client 2', image: client2 },
  { id: 3, name: 'Client 3', image: client3 },
  { id: 4, name: 'Client 4', image: client4 },
  { id: 5, name: 'Client 5', image: client5 },
  { id: 6, name: 'Client 6', image: client6 },
  { id: 7, name: 'Client 7', image: client7 },
  { id: 8, name: 'Client 8', image: client8 },
];

const Client = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-red-600 text-sm font-bold uppercase tracking-wider block mb-4">Partner</span>
          <h2 className="text-4xl font-bold text-gray-900">Happy Clients</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clientData.map((client) => (
            <a 
              key={client.id} 
              href="#" 
              className="block transition-opacity hover:opacity-70"
            >
              <Image 
                src={client.image} 
                alt={client.name} 
                className="mx-auto" 
               
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Client;