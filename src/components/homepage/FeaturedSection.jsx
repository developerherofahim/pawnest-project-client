import React from 'react';
import PetCard from '../utils/PetCard';
import cat from "../../assets/cat.jpg"
import { dmSans, playFairDisplay } from '@/lib/font';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const FeaturedSection = async () => {
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets`,{
        cache:'no-store'
    })
    const pets = await res.json();

    console.log(pets)
    return (
        <section className='bg-secondary-100'>
            <div className='container mx-auto px-5 py-20'>
                <div>
                    <p className={`${dmSans.className} text-[12px] text-secondary-700 tracking-widest`}>Ready To Meet You</p>
                    <h2 className={`${playFairDisplay.className} text-4xl font-semibold text-primary-800 mt-5`}>Featured Pets</h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-15'>
                    {
                        pets.filter((pet) => pet.isFeatured)
                            .map((pet) => (
                                <PetCard key={pet._id} pet={pet}></PetCard>
                            ))
                    }
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;