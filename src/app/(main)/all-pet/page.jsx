import PetCard from '@/components/utils/PetCard';
import { getAllPets } from '@/lib/action';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const AllPetPage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets`)
    const pets = await res.json();

    console.log(pets);

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