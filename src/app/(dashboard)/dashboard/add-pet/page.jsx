import AddPetForm from "@/components/utils/AddPetForm";

export const metadata = {
  title: "Add Pet | Pawnest",
  description: "Publish Your New Pet For Adoption",
};



const AddPetPage = () => {


    return (
       <div className='bg-secondary-100'>
            <AddPetForm/>
       </div> 
    );
};

export default AddPetPage;