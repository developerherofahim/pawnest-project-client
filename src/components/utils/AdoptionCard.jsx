'use client'

import { getAdoptionRequest } from '@/lib/action';
import { authClient } from '@/lib/auth-client';
import { dmSans } from '@/lib/font';
import { FloppyDisk } from '@gravity-ui/icons';
import { Button, Description, FieldError, Fieldset, Form, Input, Label, Surface, TextField } from '@heroui/react';
import { PawPrint } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AdoptionCard = ({ pet, requests }) => {

    const { data: session } = authClient.useSession()

    const user = session?.user;

    console.log(user);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const resetFormState = (form) => {
        form.reset();
    };

    const [alreadyRequested, setAlreadyRequested] = useState(
        requests.some(
            request =>
                String(request.petId) === String(pet._id) &&
                String(request.userId) === String(user?.id)
        )
    );

    const isUnavailable = pet?.adoptionStatus !== "Available";

    const getToken = async () => {
        const { data, error } = await authClient.token();

        if (error) {
            console.error("Token error:", error);
            return null;
        }

        return data?.token;
    };

    const handleAdoptionForm = async (e) => {
        e.preventDefault();

        if (isSubmitting || alreadyRequested) {
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        const adoptionData = {
            petId: String(pet._id),
            userId: String(user?.id),
            adopterName: String(user?.name),
            email: String(user?.email),
            pickupDate: String(formData.get("preferredPickupDate")),
            message: String(formData.get("message")).trim(),
        };

        try {
            setIsSubmitting(true);

            const token = await getToken();

            const response = await fetch(
                "http://localhost:8000/adoption-requests",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(adoptionData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // খুব গুরুত্বপূর্ণ
            setAlreadyRequested(true);

            toast.success("Your adoption request has been sent successfully");

            resetFormState(form);

            console.log(data);

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to send adoption request");

        } finally {
            // API request শেষ হলে loading বন্ধ হবে
            setIsSubmitting(false);
        }
    };



    console.log(pet);

    return (
        <div className={`container mx-auto max-w-4xl ${dmSans.className}`}>
            <Surface className="rounded-3xl border border-base-200 bg-surface shadow-2xl p-6 md:p-8">
                <Form onSubmit={handleAdoptionForm}>
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
                                        value={pet?.petName}
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
                                    <Label className='text-earth-800'>Message*</Label>
                                    <textarea
                                        required
                                        name='message'
                                        className="textarea textarea-bordered h-32 w-full rounded-2xl bg-earth-300"
                                        placeholder="Tell adopters about this pet..."
                                    />
                                    <FieldError />
                                </TextField>
                            </div>
                        </Fieldset.Group>
                        <Fieldset.Actions className="pt-4">
                            <Button
                                type='submit'
                                isDisabled={isUnavailable}
                                className="w-full h-14 rounded-2xl bg-linear-to-r from-secondary-700 via-[#D87B21] to-secondary-500 text-white text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {pet?.adoptionStatus === "Available"
                                    ? "Request to Adopt"
                                    : pet?.adoptionStatus === "Pending"
                                        ? "Request Pending"
                                        : "Already Adopted"
                                }
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </Surface>
        </div>
    );
};

export default AdoptionCard;