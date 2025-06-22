
import React from 'react';

interface BuildingTypeImageGalleryProps {
  buildingType: string;
}

const imageMap: Record<string, { src: string; description: string }[]> = {
  residential: [
    { src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80', description: 'Modern two-story residential house with a minimalist design.' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', description: 'Cozy suburban home with beautiful landscaping and a welcoming porch.' },
    { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80', description: 'A classic brick house with a symmetrical facade and large windows.' },
    { src: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80', description: 'A family house with a neat lawn and wooden facade.' },
    { src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80', description: 'Contemporary house featuring a unique angular roof and wooden accents.' },
  ],
  villa: [
    { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=80', description: 'Modern villa with a beautiful swimming pool.' },
    { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80', description: 'Sprawling luxury villa with integrated smart home technology.' },
    { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80', description: 'Mediterranean-style villa surrounded by lush gardens.' },
    { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80', description: 'Tropical villa hideaway with an open-concept living area.' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', description: 'Charming villa with rustic stone walls and a terracotta roof.' },
  ],
  commercial: [
    { src: 'https://images.unsplash.com/photo-1549488344-cbb6c144eda4?w=400&q=80', description: 'Modern commercial building with a sleek glass and steel facade.' },
    { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80', description: 'Bright and airy open-plan office space in a commercial hub.' },
    { src: 'https://images.unsplash.com/photo-1596796138784-a4f59eb12f5a?w=400&q=80', description: 'Retail storefront with large display windows on a busy street.' },
    { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80', description: 'Multi-story commercial complex with mixed-use spaces.' },
    { src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d42e2?w=400&q=80', description: 'Skyscraper housing corporate offices with panoramic city views.' },
  ],
  office: [
    { src: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&q=80', description: 'Low angle photography of a modern office building.' },
    { src: 'https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=400&q=80', description: 'Worm\'s eye view of a glass skyscraper.' },
    { src: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=400&q=80', description: 'Architectural shot of a white high-rise corporate building.' },
    { src: 'https://images.unsplash.com/photo-1549488344-cbb6c144eda4?w=400&q=80', description: 'Modern commercial building with a sleek glass and steel facade.' },
    { src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d42e2?w=400&q=80', description: 'Skyscraper housing corporate offices with panoramic city views.' },
  ],
  apartment: [
    { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80', description: 'Stylish and modern apartment living room interior.' },
    { src: 'https://images.unsplash.com/photo-1493809842344-ab553fb7240c?w=400&q=80', description: 'Exterior view of a contemporary apartment building complex.' },
    { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80', description: 'Cozy bedroom in a city apartment with a view.' },
    { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80', description: 'Minimalist apartment kitchen and dining area.' },
    { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80', description: 'Luxurious penthouse apartment with high-end finishes.' },
  ],
};

export const BuildingTypeImageGallery = ({ buildingType }: BuildingTypeImageGalleryProps) => {
  const images = imageMap[buildingType.toLowerCase()] || [];

  if (images.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No inspirational images available for this building type.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {images.map((image, index) => (
        <a 
          key={index} 
          href={image.src} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
        >
          <div className="overflow-hidden">
            <img
              src={image.src}
              alt={image.description}
              className="object-cover h-64 w-full transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <p className="font-semibold text-gray-800">{`Inspiration #${index + 1}`}</p>
            <p className="text-sm text-gray-600 mt-1">{image.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};
