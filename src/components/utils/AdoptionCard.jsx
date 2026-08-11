'use client'

import { authClient } from '@/lib/auth-client';
import { dmSans } from '@/lib/font';
import { FloppyDisk } from '@gravity-ui/icons';
import { Button, Description, FieldError, Fieldset, Form, Input, Label, Surface, TextField } from '@heroui/react';
import { PawPrint } from 'lucide-react';
import React from 'react';

const AdoptionCard = ({pet}) => {

    const { data: session } = authClient.useSession()
         
        const user = session?.user;

        console.log(pet);

    return (
        <div className={`container mx-auto max-w-4xl ${dmSans.className}`}>
            <Surface className="rounded-3xl border border-base-200 bg-surface shadow-2xl p-6 md:p-8">
                <Form>
                    <Fieldset className="space-y-4">
                        <div className="space-y-2">
                            <Fieldset.Legend className="text-3xl font-bold text-primary-800 flex justify-center items-center gap-2">
                                <span><PawPrint size={24} /></span>
                                <span>Request To Adopt {pet?.name}</span> 
                            </Fieldset.Legend>

                            <Description className="text-sm text-earth-500">
                                Fill Out this form and the owner will review your request.
                            </Description>
                        </div>
                        <Fieldset.Group className="space-y-6">

                            {/* Row 1 */}
                            <div className="space-y-4">
                                <TextField>
                                    <Label className='text-earth-800'>Pet Name*</Label>
                                    <Input
                                        readOnly
                                        value={pet?.name}
                                        name='petName'
                                        variant='secondary'
                                        placeholder="Enter pet name"
                                        className='bg-earth-300'
                                    />
                                    <FieldError />
                                </TextField>
                                <TextField>
                                    <Label className='text-earth-800'>Your Name*</Label>
                                    <Input
                                        readOnly
                                        value={user?.name}
                                        name='yourName'
                                        variant='secondary'
                                        placeholder="Enter pet name"
                                        className='bg-earth-300'
                                    />
                                    <FieldError />
                                </TextField>
                                <TextField>
                                    <Label className='text-earth-800'>Your Email*</Label>
                                    <Input
                                        readOnly
                                        value={user?.email}
                                        name='yourEmail'
                                        variant='secondary'
                                        placeholder="Enter pet name"
                                        className='bg-earth-300'
                                    />
                                    <FieldError />
                                </TextField>
                                <TextField>
                                    <Label className='text-earth-800'>Preferred Pickup Date *</Label>
                                    <Input
                                        required
                                        type="date"
                                        name='preferredPickupDate'
                                        variant='secondary'
                                        placeholder="Enter pet name"
                                        className='bg-earth-300'
                                    />
                                    <FieldError />
                                </TextField>
                                <TextField>
                                    <Label className='text-earth-800'>Description*</Label>
                                    <textarea
                                        required
                                        name='description'
                                        className="textarea textarea-bordered h-32 w-full rounded-2xl bg-earth-300"
                                        placeholder="Tell adopters about this pet..."
                                    />
                                    <FieldError />
                                </TextField>
                            </div>
                        </Fieldset.Group>
                        <Fieldset.Actions className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-14 rounded-2xl bg-linear-to-r from-secondary-700 via-[#D87B21] to-secondary-500 text-white text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <PawPrint className="w-5 h-5" />
                                <span>Adopt {pet.name}</span>
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </Surface>
        </div>
    );
};

export default AdoptionCard;