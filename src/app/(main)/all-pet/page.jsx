import PetCard from '@/components/utils/PetCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export const metadata = {
  title: "All Pets | Pawnest",
  description: "A modern platform for finding and adopting loving pets.",
};

const AllPetPage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets`,{
        cache:"no-store"
    })
    const pets = await res.json();

    

    return (
        <section className='bg-secondary-100'>
            <div className="container mx-auto px-5 sm:px-6 lg:px-6 py-14 md:py-20 lg:py-28">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {
                        pets.map((pet) => (
                                <PetCard key={pet._id} pet={pet}></PetCard>
                            ))
                    }
                </div>
            </div>
        </section>
    );
};

export default AllPetPage;