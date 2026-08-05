'use client'


import { dmSans } from '@/lib/font';
import { FloppyDisk, PlanetEarth, SquareArticle } from '@gravity-ui/icons';
import { Button, Description, FieldError, Fieldset, Form, Input, Label, Surface, TextArea, TextField, Select, ListBox, Checkbox } from '@heroui/react';



const AddPetForm = () => {

    const personalities = [
        { id: "friendly", label: "Friendly" },
        { id: "playful", label: "Playful" },
        { id: "loyal", label: "Loyal" },
        { id: "calm", label: "Calm" },
        { id: "energetic", label: "Energetic" },
        { id: "good-with-kids", label: "Good with Kids" },
    ];



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const petData = {
            ...Object.fromEntries(formData),
            personality: formData.getAll("personality"),
            isFeatured: formData.has("isFeatured"),
        };

        console.log(petData);

        const res = await fetch("http://localhost:8000/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(petData),
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <div className={`container mx-auto max-w-4xl px-4 py-12 ${dmSans.className}`}>
            <Surface className="rounded-3xl border border-base-200 bg-surface shadow-2xl p-8 md:p-10">
                <Form onSubmit={handleSubmit}>
                    <Fieldset className="space-y-8">
                        <div className="space-y-2">
                            <Fieldset.Legend className="text-3xl font-bold text-[#1E3A2F]">
                                Add New Pet
                            </Fieldset.Legend>

                            <Description className="text-sm text-[#8b7355]">
                                Fill in the details below to publish your pet for adoption.
                            </Description>
                        </div>

                        <Fieldset.Group className="space-y-6">

                            {/* Row 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextField>
                                    <Label className='text-[#5c4a32]'>Pet Name*</Label>
                                    <Input
                                        required
                                        name='petName'
                                        variant='secondary'
                                        placeholder="Enter pet name"
                                        className='bg-[#E8DFC8]'
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField>
                                    <Label className='text-[#5c4a32]'>Breed*</Label>
                                    <Input
                                        required
                                        name='breed'
                                        placeholder="Golden Retriever"
                                        className='bg-[#E8DFC8]'
                                    />
                                    <FieldError />
                                </TextField>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <Select name='species' className="w-full" placeholder="Select Category" required>
                                    <Label className='text-[#5c4a32] text-sm'>Species*</Label>

                                    <Select.Trigger className='bg-[#E8DFC8]'>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="dog" textValue='Dog'>
                                                Dog
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="cat" textValue='Cat'>
                                                Cat
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="bird" textValue='Bird'>
                                                Bird
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="rabbit" textValue='Rabbit'>
                                                Rabbit
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                    <FieldError />
                                </Select>

                                <TextField>
                                    <Label className='text-[#5c4a32]'>Location*</Label>
                                    <Input
                                        required
                                        name='location'
                                        placeholder="Dhaka"

                                        className='bg-[#E8DFC8]'
                                    />
                                    <FieldError />
                                </TextField>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <TextField>
                                    <Label className='text-[#5c4a32]'>Age*</Label>
                                    <Input
                                        required
                                        name='age'
                                        placeholder="2 Years"

                                        className='bg-[#E8DFC8]'
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField>
                                    <Label className='text-[#5c4a32]'>Gender*</Label>
                                    <Input
                                        required
                                        name='gender'
                                        placeholder="Male"

                                        className='bg-[#E8DFC8]'
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField>
                                    <Label className='text-[#5c4a32]'>Adoption Fee*</Label>
                                    <Input
                                        required
                                        name='adoptionFee'
                                        placeholder="$50"

                                        className='bg-[#E8DFC8]'
                                    />
                                    <FieldError />
                                </TextField>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[#5c4a32]">Personality*</Label>

                                <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#E8DFC8] p-4">

                                    {personalities.map((item, index) => (
                                        <label
                                            key={index}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <Input
                                                required
                                                type="checkbox"
                                                name="personality"
                                                value={item.label}
                                                className="checkbox checked:border-[#1E3A2F] checked:bg-[#1E3A2F] checked:text-[#E8892B]"
                                            />

                                            <span>{item.label}</span>
                                        </label>
                                    ))}
                                    <FieldError />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select name='healthStatus' className="w-full" placeholder="Select Category" required>
                                    <Label className='text-[#5c4a32] text-sm'>Health Status*</Label>

                                    <Select.Trigger className='bg-[#E8DFC8]'>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="excellent" textValue='Excellent'>
                                                Excellent
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="healthy" textValue='Healthy'>
                                                Healthy
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="minor-health-issue" textValue='Minor Health Issue'>
                                                Minor Health Issue
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="under-treatment" textValue='Under Treatment'>
                                                Under Treatment
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="recovering" textValue='Recovering'>
                                                Recovering
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                    <FieldError />
                                </Select>
                                <Select name='vaccinationStatus' className="w-full" placeholder="Select Category" required>
                                    <Label className='text-[#5c4a32] text-sm'>Vaccination Status*</Label>

                                    <Select.Trigger className='bg-[#E8DFC8]'>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="fully-vaccinated" textValue='Fully Vaccinated'>
                                                Fully Vaccinated
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="partially-vaccinated" textValue='Partially Vaccinated'>
                                                Partially Vaccinated
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="not-vaccinated" textValue='Not Vaccinated'>
                                                Not Vaccinated
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item id="vaccination-due" textValue='Vaccination Due'>
                                                Vaccination Due
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="vaccination-scheduled" textValue='Vaccination Scheduled'>
                                                Vaccination Scheduled
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                    <FieldError />
                                </Select>

                            </div>
                            <TextField>
                                <Label className='text-[#5c4a32]'>Pet Image URL*</Label>
                                <Input
                                    required
                                    name='imageUrl'
                                    type='url'
                                    placeholder="Paste Your Pet Image URL"

                                    className='bg-[#E8DFC8]'
                                />
                                <FieldError />
                            </TextField>

                            {/* Description */}
                            <TextField>
                                <Label className='text-[#5c4a32]'>Description*</Label>
                                <textarea
                                    required
                                    name='description'
                                    className="textarea textarea-bordered h-32 w-full rounded-2xl bg-[#E8DFC8]"
                                    placeholder="Tell adopters about this pet..."
                                />
                                <FieldError />
                            </TextField>

                        </Fieldset.Group>

                        <Fieldset.Actions className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-14 rounded-2xl bg-linear-to-r from-[#C4711A] via-[#D87B21] to-[#E8892B] text-white text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <FloppyDisk className="w-5 h-5" />
                                <span>Publish Pet for Adoption</span>
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </Surface>
        </div>
    );
};

export default AddPetForm;