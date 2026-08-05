import React from 'react';
import PetCard from '../utils/PetCard';
import cat from "../../assets/cat.jpg"
import { dmSans, playFairDisplay } from '@/lib/font';

const pets = [
    {
        _id: "1",
        name: "Bella",
        price: "$200",
        breed: "Golden Retriever",
        image: cat,
        location: "Chittagong",
        category: "Cat",
        age: "2 Years",
        weight: "9 kg",
        personality: [
            "Friendly",
            "Playful",
            "House Trained",
            "Good with Kids",
        ],
    },
    {
        _id: "2",
        name: "Bella",
        price: "$200",
        breed: "Golden Retriever",
        image: cat,
        location: "Chittagong",
        category: "Cat",
        age: "2 Years",
        weight: "9 kg",
        personality: [
            "Friendly",
            "Playful",
            "House Trained",
            "Good with Kids",
        ],
    },
    {
        _id: "3",
        name: "Bella",
        price: "$200",
        breed: "Golden Retriever",
        image: cat,
        location: "Chittagong",
        category: "Cat",
        age: "2 Years",
        weight: "9 kg",
        personality: [
            "Friendly",
            "Playful",
            "House Trained",
            "Good with Kids",
        ],
    }
];

const FeaturedSection = () => {
    return (
        <section className='bg-[#F7F2E8]'>
            <div className='container mx-auto px-5 py-20'>
                <div>
                    <p className={`${dmSans.className} text-[12px] text-[#C4711A] tracking-widest`}>Ready To Meet You</p>
                    <h2 className={`${playFairDisplay.className} text-4xl font-semibold text-[#1E3A2F] mt-5`}>Featured Pets</h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-15'>
                    {
                        pets.map((pet)=>(
                            <PetCard key={pet._id} pet={pet}></PetCard>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;