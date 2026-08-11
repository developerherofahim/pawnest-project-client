export const getAllPets =async()=>{
    const res = await fetch("http://localhost:8000/pets")
    const data = await res.json();
    return data;
}

export const getSinglePet = async(id)=>{
    const res = await fetch(`http://localhost:8000/pets/${id}`);
    const data = await res.json();
    return data;
}