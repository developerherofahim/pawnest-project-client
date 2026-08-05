import React from 'react';

const AllPetPage = async() => {

    const res = await fetch("http://localhost:8000/pets");

    const pets = await res.json();

    console.log(pets);

    return (
        <div>
            All Pet Page
        </div>
    );
};

export default AllPetPage;