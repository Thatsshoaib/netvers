import React from "react";
import HomeNavbar from "../Components/homeNavbar";

const winners = [
  {
    id: 1,
    name: "Rahul Sharma",
    title: "Best Performer 2024",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", // Replace with actual winner image URL
  },
  {
    id: 2,
    name: "Priya Kapoor",
    title: "Top Achiever 2024",
    image: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-04.jpg",
  },
  {
    id: 3,
    name: "Amit Verma",
    title: "Most Inspiring Leader",
    image: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-05.jpg",
  },
  {
    id: 4,
    name: "Sonia Mehta",
    title: "Rising Star 2025",
    image: "https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg",
  },
];

const Gallery = () => {
  return (
    <div className="font-sans">
      <HomeNavbar />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white text-center py-20 mt-16">
        <h1 className="text-4xl font-bold">Winners Gallery</h1>
        <p className="text-lg text-gray-300 mt-2">
          Celebrating our top achievers and their success.
        </p>
      </div>

      {/* Gallery Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {winners.map((winner) => (
              <div
                key={winner.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {winner.name}
                  </h3>
                  <p className="text-gray-500">{winner.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 GrowEx. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
