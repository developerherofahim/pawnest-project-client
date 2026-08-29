"use client";
import { authClient } from "@/lib/auth-client";
import { dmSans, playFairDisplay } from "@/lib/font";
import { FloppyDisk } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    ListBox,
    Select,
    Surface,
    TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

/* =========================================================
   CONSTANTS
========================================================= */

const API_URL =
    process.env.NEXT_PUBLIC_URL

const PERSONALITIES = [
    { id: "friendly", label: "Friendly" },
    { id: "playful", label: "Playful" },
    { id: "loyal", label: "Loyal" },
    { id: "calm", label: "Calm" },
    { id: "energetic", label: "Energetic" },
    { id: "good-with-kids", label: "Good with Kids" },
];

const SPECIES = [
    { id: "dog", label: "Dog" },
    { id: "cat", label: "Cat" },
    { id: "bird", label: "Bird" },
    { id: "rabbit", label: "Rabbit" },
];

const GENDERS = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
];

const HEALTH_STATUSES = [
    { id: "excellent", value: "Excellent" },
    { id: "healthy", value: "Healthy" },
    {
        id: "minor-health-issue",
        value: "Minor Health Issue",
    },
    {
        id: "under-treatment",
        value: "Under Treatment",
    },
    { id: "recovering", value: "Recovering" },
];

const VACCINATION_STATUSES = [
    {
        id: "fully-vaccinated",
        value: "Fully Vaccinated",
    },
    {
        id: "partially-vaccinated",
        value: "Partially Vaccinated",
    },
    {
        id: "not-vaccinated",
        value: "Not Vaccinated",
    },
    {
        id: "vaccination-due",
        value: "Vaccination Due",
    },
    {
        id: "vaccination-scheduled",
        value: "Vaccination Scheduled",
    },
];

const ALLOWED_SPECIES = SPECIES.map((item) => item.id);

const ALLOWED_GENDERS = GENDERS.map((item) => item.id);

const ALLOWED_PERSONALITIES = PERSONALITIES.map(
    (item) => item.label
);

const ALLOWED_HEALTH_STATUSES = HEALTH_STATUSES.map(
    (item) => item.value
);

const ALLOWED_VACCINATION_STATUSES =
    VACCINATION_STATUSES.map((item) => item.value);


/* =========================================================
   HELPERS
========================================================= */

/**
 * Converts:
 * "2 Years"     -> { value: 2, unit: "years" }
 * "6 Months"    -> { value: 6, unit: "months" }
 */
const parseAge = (age) => {
    const match = age
        .trim()
        .match(/^(\d+(?:\.\d+)?)\s*(year|years|month|months)$/i);

    if (!match) {
        return null;
    }

    const value = Number(match[1]);
    const unit = match[2].toLowerCase();

    return {
        value,
        unit: unit.startsWith("year")
            ? "years"
            : "months",
    };
};


/**
 * Converts:
 * "2 Kg"  -> { value: 2, unit: "kg" }
 * "500 g"  -> { value: 500, unit: "g" }
 */
const parseWeight = (weight) => {
    const match = weight
        .trim()
        .match(/^(\d+(?:\.\d+)?)\s*(kg|g)$/i);

    if (!match) {
        return null;
    }

    return {
        value: Number(match[1]),
        unit: match[2].toLowerCase(),
    };
};


/* =========================================================
   VALIDATION
========================================================= */

const validatePetData = (data) => {
    const errors = {};

    /* -------------------------
       Pet Name
    ------------------------- */

    if (!data.petName) {
        errors.petName = "Pet name is required.";
    } else if (data.petName.length < 2) {
        errors.petName =
            "Pet name must be at least 2 characters.";
    } else if (data.petName.length > 30) {
        errors.petName =
            "Pet name must not exceed 30 characters.";
    } else if (
        !/^[\p{L}\p{M}\s'-]+$/u.test(data.petName)
    ) {
        errors.petName =
            "Pet name can only contain letters, spaces, apostrophes and hyphens.";
    }


    /* -------------------------
       Breed
    ------------------------- */

    if (!data.breed) {
        errors.breed = "Breed is required.";
    } else if (data.breed.length < 2) {
        errors.breed =
            "Breed must be at least 2 characters.";
    } else if (data.breed.length > 50) {
        errors.breed =
            "Breed must not exceed 50 characters.";
    }


    /* -------------------------
       Species
    ------------------------- */

    if (!data.species) {
        errors.species =
            "Please select a species.";
    } else if (
        !ALLOWED_SPECIES.includes(data.species)
    ) {
        errors.species =
            "Invalid species selected.";
    }


    /* -------------------------
       Location
    ------------------------- */

    if (!data.location) {
        errors.location =
            "Location is required.";
    } else if (data.location.length < 2) {
        errors.location =
            "Location must be at least 2 characters.";
    } else if (data.location.length > 100) {
        errors.location =
            "Location must not exceed 100 characters.";
    }


    /* -------------------------
       Weight
    ------------------------- */

    if (!data.weight) {
        errors.weight =
            "Weight is required.";
    } else {
        const parsedWeight =
            parseWeight(data.weight);

        if (!parsedWeight) {
            errors.weight =
                "Enter a valid weight such as 2 Kg or 500 g.";
        } else if (parsedWeight.value <= 0) {
            errors.weight =
                "Weight must be greater than 0.";
        } else if (
            parsedWeight.unit === "kg" &&
            parsedWeight.value > 1000
        ) {
            errors.weight =
                "Please enter a realistic weight.";
        } else if (
            parsedWeight.unit === "g" &&
            parsedWeight.value > 1000000
        ) {
            errors.weight =
                "Please enter a realistic weight.";
        }
    }


    /* -------------------------
       Age
    ------------------------- */

    if (!data.age) {
        errors.age = "Age is required.";
    } else {
        const parsedAge = parseAge(data.age);

        if (!parsedAge) {
            errors.age =
                "Enter age like 2 Years or 6 Months.";
        } else if (parsedAge.value <= 0) {
            errors.age =
                "Age must be greater than 0.";
        } else if (
            parsedAge.unit === "years" &&
            parsedAge.value > 100
        ) {
            errors.age =
                "Please enter a realistic age.";
        } else if (
            parsedAge.unit === "months" &&
            parsedAge.value > 1200
        ) {
            errors.age =
                "Please enter a realistic age.";
        }
    }


    /* -------------------------
       Gender
    ------------------------- */

    if (!data.gender) {
        errors.gender =
            "Please select gender.";
    } else if (
        !ALLOWED_GENDERS.includes(data.gender)
    ) {
        errors.gender =
            "Invalid gender selected.";
    }


    /* -------------------------
       Adoption Fee
    ------------------------- */

    if (
        data.adoptionFee === "" ||
        data.adoptionFee === null ||
        data.adoptionFee === undefined
    ) {
        errors.adoptionFee =
            "Adoption fee is required.";
    } else if (
        !/^\d+(?:\.\d{1,2})?$/.test(
            String(data.adoptionFee)
        )
    ) {
        errors.adoptionFee =
            "Adoption fee must be a valid number.";
    } else {
        const fee = Number(data.adoptionFee);

        if (!Number.isFinite(fee)) {
            errors.adoptionFee =
                "Adoption fee must be a valid number.";
        } else if (fee < 0) {
            errors.adoptionFee =
                "Adoption fee cannot be negative.";
        } else if (fee > 1000000) {
            errors.adoptionFee =
                "Adoption fee is too high.";
        }
    }


    /* -------------------------
       Personality
    ------------------------- */

    const personalities = Array.isArray(
        data.personality
    )
        ? data.personality
        : [];

    if (personalities.length === 0) {
        errors.personality =
            "Please select at least one personality.";
    } else if (personalities.length > 3) {
        errors.personality =
            "You can select a maximum of 3 personalities.";
    } else {
        const hasInvalidPersonality =
            personalities.some(
                (item) =>
                    !ALLOWED_PERSONALITIES.includes(item)
            );

        if (hasInvalidPersonality) {
            errors.personality =
                "Invalid personality selected.";
        }
    }


    /* -------------------------
       Health Status
    ------------------------- */

    if (!data.healthStatus) {
        errors.healthStatus =
            "Please select health status.";
    } else if (
        !ALLOWED_HEALTH_STATUSES.includes(
            data.healthStatus
        )
    ) {
        errors.healthStatus =
            "Invalid health status.";
    }


    /* -------------------------
       Vaccination Status
    ------------------------- */

    if (!data.vaccinationStatus) {
        errors.vaccinationStatus =
            "Please select vaccination status.";
    } else if (
        !ALLOWED_VACCINATION_STATUSES.includes(
            data.vaccinationStatus
        )
    ) {
        errors.vaccinationStatus =
            "Invalid vaccination status.";
    }


    /* -------------------------
       Image URL
    ------------------------- */

    if (!data.imageUrl) {
        errors.imageUrl =
            "Image URL is required.";
    } else {
        try {
            const url = new URL(
                data.imageUrl
            );

            if (
                !["http:", "https:"].includes(
                    url.protocol
                )
            ) {
                errors.imageUrl =
                    "Please enter a valid image URL.";
            }
        } catch {
            errors.imageUrl =
                "Please enter a valid image URL.";
        }
    }


    /* -------------------------
       Description
    ------------------------- */

    if (!data.description) {
        errors.description =
            "Description is required.";
    } else if (
        data.description.length < 20
    ) {
        errors.description =
            "Description must be at least 20 characters.";
    } else if (
        data.description.length > 1000
    ) {
        errors.description =
            "Description must not exceed 1000 characters.";
    }


    return errors;
};


/* =========================================================
   COMPONENT
========================================================= */

const AddPetForm = () => {
    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    /* Controlled Select states */
    const [species, setSpecies] =
        useState(null);

    const [gender, setGender] =
        useState(null);

    const [healthStatus, setHealthStatus] =
        useState(null);

    const [
        vaccinationStatus,
        setVaccinationStatus,
    ] = useState(null);

    /* Personality state */
    const [
        selectedPersonalities,
        setSelectedPersonalities,
    ] = useState([]);


    /* =====================================================
       ERROR HELPER
    ===================================================== */

    const clearError = (field) => {
        setErrors((prev) => {
            if (!prev[field]) {
                return prev;
            }

            const next = {
                ...prev,
            };

            delete next[field];

            return next;
        });
    };


    /* =====================================================
       PERSONALITY HANDLER
    ===================================================== */

    const handlePersonalityChange = (e) => {
        const {
            value,
            checked,
        } = e.target;

        setSelectedPersonalities((prev) => {
            if (checked) {
                if (prev.length >= 3) {
                    toast.error(
                        "You can select a maximum of 3 personalities."
                    );

                    return prev;
                }

                clearError("personality");

                return [
                    ...prev,
                    value,
                ];
            }

            const updated = prev.filter(
                (item) => item !== value
            );

            if (updated.length > 0) {
                clearError("personality");
            }

            return updated;
        });
    };


    /* =====================================================
       RESET FORM
    ===================================================== */

    const resetFormState = (form) => {
        form.reset();

        setSpecies(null);
        setGender(null);
        setHealthStatus(null);
        setVaccinationStatus(null);

        setSelectedPersonalities([]);

        setErrors({});
    };

    const getToken = async () => {
        const { data, error } = await authClient.token();

        if (error) {
            console.error("Token error:", error);
            return null;
        }

        return data?.token;
    };

    const { data: session } = authClient.useSession();

    const user = session?.user;

    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (e) => {
        e.preventDefault();



        // Prevent duplicate submission
        if (isSubmitting) {
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        /* ---------------------------------------------
           Collect form data
        --------------------------------------------- */

        const rawData = {
            petName: String(
                formData.get("petName") || ""
            ).trim(),

            ownerEmail: String(user.email),

            breed: String(
                formData.get("breed") || ""
            ).trim(),

            species,

            location: String(
                formData.get("location") || ""
            ).trim(),

            weight: String(
                formData.get("weight") || ""
            ).trim(),

            age: String(
                formData.get("age") || ""
            ).trim(),

            gender,

            adoptionFee: String(
                formData.get("adoptionFee") || ""
            ).trim(),

            personality: selectedPersonalities,

            healthStatus,

            vaccinationStatus,

            imageUrl: String(
                formData.get("imageUrl") || ""
            ).trim(),

            description: String(
                formData.get("description") || ""
            ).trim(),
        };

        /* ---------------------------------------------
           Validate
        --------------------------------------------- */

        const validationErrors =
            validatePetData(rawData);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            toast.error(
                "Please fix the highlighted fields."
            );

            return;
        }

        /* ---------------------------------------------
           Parse age and weight
        --------------------------------------------- */

        const parsedAge = parseAge(rawData.age);
        const parsedWeight = parseWeight(rawData.weight);

        if (!parsedAge || !parsedWeight) {
            toast.error(
                "Invalid age or weight format."
            );

            return;
        }

        /* ---------------------------------------------
           Create final payload
        --------------------------------------------- */

        const petData = {
            petName: rawData.petName,
            ownerEmail: rawData.ownerEmail,
            breed: rawData.breed,
            species: rawData.species,
            location: rawData.location,

            age: parsedAge,

            weight: parsedWeight,

            gender: rawData.gender,

            adoptionFee: Number(
                rawData.adoptionFee
            ),

            personality: rawData.personality,

            healthStatus: rawData.healthStatus,

            vaccinationStatus:
                rawData.vaccinationStatus,

            imageUrl: rawData.imageUrl,

            description: rawData.description,

            adoptionStatus: "Available",
        };

        /* ---------------------------------------------
           API request
        --------------------------------------------- */

        try {
            setIsSubmitting(true);

            const token = await getToken();

            const requestOptions = {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: `Bearer ${token}`
                },

                body: JSON.stringify(petData),
            };

            /* -----------------------------------------
               Send both requests
            ----------------------------------------- */

            const [
                responseAllPet
            ] = await Promise.all([
                fetch(
                    `${API_URL}/pets`,
                    requestOptions
                )
            ]);

            /* -----------------------------------------
               Parse responses safely
            ----------------------------------------- */

            const parseResponse = async (response) => {
                const contentType =
                    response.headers.get(
                        "content-type"
                    );

                if (
                    contentType?.includes(
                        "application/json"
                    )
                ) {
                    return await response.json();
                }

                return null;
            };

            const [
                resultAllPet
            ] = await Promise.all([
                parseResponse(responseAllPet)
            ]);

            /* -----------------------------------------
               Check /pets response
            ----------------------------------------- */

            if (!responseAllPet.ok) {
                throw new Error(
                    resultAllPet?.message ||
                    resultAllPet?.error ||
                    `Failed to add pet to /pets. Server returned ${responseAllPet.status}.`
                );
            }

            /* -----------------------------------------
               Check /add-pet response
            ----------------------------------------- */

            /* -----------------------------------------
               Success
            ----------------------------------------- */

            toast.success(
                "Your pet has been added successfully!"
            );

            resetFormState(form);
            redirect('/my-listing')

        } catch (error) {
            console.error(
                "Add pet error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );

        } finally {
            setIsSubmitting(false);
        }
    };



    


    /* =====================================================
       JSX
    ===================================================== */

    return (
        <div
            className={`container mx-auto max-w-4xl px-4 py-12 ${dmSans.className}`}
        >
            <Surface className="rounded-3xl border border-base-200 bg-surface p-8 shadow-2xl md:p-10">

                <Form
                    onSubmit={
                        handleSubmit
                    }
                >
                    <Fieldset className="space-y-8">

                        {/* =================================
                            HEADER
                        ================================= */}

                        <div className="space-y-2">
                            <Fieldset.Legend className={`${playFairDisplay.className} text-3xl font-bold text-primary-800`}>
                                Add New Pet
                            </Fieldset.Legend>

                            <Description className="text-sm text-earth-500">
                                Fill in the details below to publish your pet for adoption.
                            </Description>
                        </div>


                        <Fieldset.Group className="space-y-6">

                            {/* =================================
                                PET NAME + BREED
                            ================================= */}

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                <TextField
                                    isInvalid={
                                        Boolean(
                                            errors.petName
                                        )
                                    }
                                >
                                    <Label className="text-earth-800">
                                        Pet Name*
                                    </Label>

                                    <Input
                                        name="petName"
                                        required
                                        autoComplete="off"
                                        placeholder="Enter pet name"
                                        className="bg-earth-300"
                                        onChange={() =>
                                            clearError(
                                                "petName"
                                            )
                                        }
                                    />

                                    <FieldError>
                                        {
                                            errors.petName
                                        }
                                    </FieldError>
                                </TextField>


                                <TextField
                                    isInvalid={
                                        Boolean(
                                            errors.breed
                                        )
                                    }
                                >
                                    <Label className="text-earth-800">
                                        Breed*
                                    </Label>

                                    <Input
                                        name="breed"
                                        required
                                        autoComplete="off"
                                        placeholder="Golden Retriever"
                                        className="bg-earth-300"
                                        onChange={() =>
                                            clearError(
                                                "breed"
                                            )
                                        }
                                    />

                                    <FieldError>
                                        {
                                            errors.breed
                                        }
                                    </FieldError>
                                </TextField>

                            </div>


                            {/* =================================
                                SPECIES + LOCATION + WEIGHT
                            ================================= */}

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                                {/* Species */}

                                <Select
                                    name="species"
                                    value={species}
                                    onChange={(value) => {
                                        setSpecies(
                                            value
                                                ? String(
                                                    value
                                                )
                                                : null
                                        );

                                        clearError(
                                            "species"
                                        );
                                    }}
                                    isRequired
                                    isInvalid={
                                        Boolean(
                                            errors.species
                                        )
                                    }
                                    className="w-full"
                                    variant="secondary"
                                    placeholder="Select Category"
                                >
                                    <Label className="text-sm text-earth-800">
                                        Species
                                    </Label>

                                    <Select.Trigger className="bg-earth-300">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            {SPECIES.map(
                                                (item) => (
                                                    <ListBox.Item
                                                        key={
                                                            item.id
                                                        }
                                                        id={
                                                            item.id
                                                        }
                                                        textValue={
                                                            item.label
                                                        }
                                                    >
                                                        {
                                                            item.label
                                                        }

                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                )
                                            )}
                                        </ListBox>
                                    </Select.Popover>

                                    <FieldError>
                                        {
                                            errors.species
                                        }
                                    </FieldError>
                                </Select>


                                {/* Location */}

                                <TextField
                                    isInvalid={
                                        Boolean(
                                            errors.location
                                        )
                                    }
                                >
                                    <Label className="text-earth-800">
                                        Location*
                                    </Label>

                                    <Input
                                        name="location"
                                        required
                                        autoComplete="address-level2"
                                        placeholder="Dhaka"
                                        className="bg-earth-300"
                                        onChange={() =>
                                            clearError(
                                                "location"
                                            )
                                        }
                                    />

                                    <FieldError>
                                        {
                                            errors.location
                                        }
                                    </FieldError>
                                </TextField>


                                {/* Weight */}

                                <TextField
                                    isInvalid={
                                        Boolean(
                                            errors.weight
                                        )
                                    }
                                >
                                    <Label className="text-earth-800">
                                        Weight*
                                    </Label>

                                    <Input
                                        name="weight"
                                        required
                                        placeholder="2 Kg"
                                        className="bg-earth-300"
                                        onChange={() =>
                                            clearError(
                                                "weight"
                                            )
                                        }
                                    />

                                    <Description className="text-xs text-earth-500">
                                        Example: 2 Kg or 500 g
                                    </Description>

                                    <FieldError>
                                        {
                                            errors.weight
                                        }
                                    </FieldError>
                                </TextField>

                            </div>


                            {/* =================================
                                AGE + GENDER + ADOPTION FEE
                            ================================= */}

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                                {/* Age */}

                                <TextField
                                    isInvalid={
                                        Boolean(
                                            errors.age
                                        )
                                    }
                                >
                                    <Label className="text-earth-800">
                                        Age*
                                    </Label>

                                    <Input
                                        name="age"
                                        required
                                        placeholder="2 Years"
                                        className="bg-earth-300"
                                        onChange={() =>
                                            clearError(
                                                "age"
                                            )
                                        }
                                    />

                                    <Description className="text-xs text-earth-500">
                                        Example: 2 Years or 6 Months
                                    </Description>

                                    <FieldError>
                                        {
                                            errors.age
                                        }
                                    </FieldError>
                                </TextField>


                                {/* Gender */}

                                <Select
                                    name="gender"
                                    value={gender}
                                    onChange={(value) => {
                                        setGender(
                                            value
                                                ? String(
                                                    value
                                                )
                                                : null
                                        );

                                        clearError(
                                            "gender"
                                        );
                                    }}
                                    isRequired
                                    isInvalid={
                                        Boolean(
                                            errors.gender
                                        )
                                    }
                                    className="w-full"
                                    variant="secondary"
                                    placeholder="Select Gender"
                                >
                                    <Label className="text-earth-800">
                                        Gender
                                    </Label>

                                    <Select.Trigger className="bg-earth-300">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            {GENDERS.map(
                                                (item) => (
                                                    <ListBox.Item
                                                        key={
                                                            item.id
                                                        }
                                                        id={
                                                            item.id
                                                        }
                                                        textValue={
                                                            item.label
                                                        }
                                                    >
                                                        {
                                                            item.label
                                                        }

                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                )
                                            )}
                                        </ListBox>
                                    </Select.Popover>

                                    <FieldError>
                                        {
                                            errors.gender
                                        }
                                    </FieldError>
                                </Select>


                                {/* Adoption Fee */}

                                <TextField
                                    isInvalid={
                                        Boolean(
                                            errors.adoptionFee
                                        )
                                    }
                                >
                                    <Label className="text-earth-800">
                                        Adoption Fee*
                                    </Label>

                                    <Input
                                        name="adoptionFee"
                                        required
                                        inputMode="decimal"
                                        placeholder="5000"
                                        className="bg-earth-300"
                                        onChange={() =>
                                            clearError(
                                                "adoptionFee"
                                            )
                                        }
                                    />

                                    <Description className="text-xs text-earth-500">
                                        Enter amount in USD
                                    </Description>

                                    <FieldError>
                                        {
                                            errors.adoptionFee
                                        }
                                    </FieldError>
                                </TextField>

                            </div>


                            {/* =================================
                                PERSONALITY
                            ================================= */}

                            <div className="space-y-2">

                                <div className="flex items-center justify-between">
                                    <Label className="text-earth-800">
                                        Personality*
                                    </Label>

                                    <span
                                        className={`text-sm ${selectedPersonalities.length >=
                                            3
                                            ? "font-semibold text-primary-700"
                                            : "text-earth-500"
                                            }`}
                                    >
                                        {
                                            selectedPersonalities.length
                                        }
                                        /3 selected
                                    </span>
                                </div>


                                <div
                                    className={`grid grid-cols-2 gap-3 rounded-xl bg-earth-300 p-4 md:grid-cols-3 ${errors.personality
                                        ? "border border-danger"
                                        : ""
                                        }`}
                                >
                                    {PERSONALITIES.map(
                                        (item) => {
                                            const isSelected =
                                                selectedPersonalities.includes(
                                                    item.label
                                                );

                                            const isDisabled =
                                                selectedPersonalities.length >=
                                                3 &&
                                                !isSelected;

                                            return (
                                                <label
                                                    key={
                                                        item.id
                                                    }
                                                    className={`flex cursor-pointer items-center gap-2 rounded-lg p-2 transition ${isDisabled
                                                        ? "cursor-not-allowed opacity-50"
                                                        : "hover:bg-earth-200"
                                                        }`}
                                                >
                                                    <Input
                                                        type="checkbox"
                                                        name="personality"
                                                        value={
                                                            item.label
                                                        }
                                                        checked={
                                                            isSelected
                                                        }
                                                        disabled={
                                                            isDisabled
                                                        }
                                                        onChange={
                                                            handlePersonalityChange
                                                        }
                                                        aria-label={
                                                            item.label
                                                        }
                                                        className="checkbox checked:border-primary-800 checked:bg-primary-800 checked:text-secondary-500"
                                                    />

                                                    <span className="text-sm">
                                                        {
                                                            item.label
                                                        }
                                                    </span>
                                                </label>
                                            );
                                        }
                                    )}
                                </div>

                                <FieldError>
                                    {
                                        errors.personality
                                    }
                                </FieldError>

                            </div>


                            {/* =================================
                                HEALTH + VACCINATION
                            ================================= */}

                            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">

                                {/* Health Status */}

                                <Select
                                    name="healthStatus"
                                    value={
                                        healthStatus
                                    }
                                    onChange={(value) => {
                                        setHealthStatus(
                                            value
                                                ? String(
                                                    value
                                                )
                                                : null
                                        );

                                        clearError(
                                            "healthStatus"
                                        );
                                    }}
                                    isRequired
                                    isInvalid={
                                        Boolean(
                                            errors.healthStatus
                                        )
                                    }
                                    className="w-full"
                                    variant="secondary"
                                    placeholder="Select Health Status"
                                >
                                    <Label className="text-sm text-earth-800">
                                        Health Status
                                    </Label>

                                    <Select.Trigger className="w-full bg-earth-300">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            {HEALTH_STATUSES.map(
                                                (item) => (
                                                    <ListBox.Item
                                                        key={
                                                            item.id
                                                        }
                                                        id={
                                                            item.value
                                                        }
                                                        textValue={
                                                            item.value
                                                        }
                                                    >
                                                        {
                                                            item.value
                                                        }

                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                )
                                            )}
                                        </ListBox>
                                    </Select.Popover>

                                    <FieldError>
                                        {
                                            errors.healthStatus
                                        }
                                    </FieldError>
                                </Select>


                                {/* Vaccination */}

                                <Select
                                    name="vaccinationStatus"
                                    value={
                                        vaccinationStatus
                                    }
                                    onChange={(value) => {
                                        setVaccinationStatus(
                                            value
                                                ? String(
                                                    value
                                                )
                                                : null
                                        );

                                        clearError(
                                            "vaccinationStatus"
                                        );
                                    }}
                                    isRequired
                                    isInvalid={
                                        Boolean(
                                            errors.vaccinationStatus
                                        )
                                    }
                                    className="w-full"
                                    variant="secondary"
                                    placeholder="Select Vaccination Status"
                                >
                                    <Label className="text-sm text-earth-800">
                                        Vaccination Status
                                    </Label>

                                    <Select.Trigger className="w-full bg-earth-300">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            {VACCINATION_STATUSES.map(
                                                (item) => (
                                                    <ListBox.Item
                                                        key={
                                                            item.id
                                                        }
                                                        id={
                                                            item.value
                                                        }
                                                        textValue={
                                                            item.value
                                                        }
                                                    >
                                                        {
                                                            item.value
                                                        }

                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                )
                                            )}
                                        </ListBox>
                                    </Select.Popover>

                                    <FieldError>
                                        {
                                            errors.vaccinationStatus
                                        }
                                    </FieldError>
                                </Select>

                            </div>


                            {/* =================================
                                IMAGE URL
                            ================================= */}

                            <TextField
                                isInvalid={
                                    Boolean(
                                        errors.imageUrl
                                    )
                                }
                            >
                                <Label className="text-earth-800">
                                    Pet Image URL*
                                </Label>

                                <Input
                                    name="imageUrl"
                                    type="url"
                                    required
                                    autoComplete="url"
                                    placeholder="https://example.com/pet-image.jpg"
                                    className="bg-earth-300"
                                    onChange={() =>
                                        clearError(
                                            "imageUrl"
                                        )
                                    }
                                />

                                <FieldError>
                                    {
                                        errors.imageUrl
                                    }
                                </FieldError>
                            </TextField>


                            {/* =================================
                                Owner Email
                            ================================= */}

                            <TextField
                            >
                                <Label className="text-earth-800">
                                    Owner Email*
                                </Label>

                                <Input
                                    name="ownerEmail"
                                    type="email"
                                    readOnly
                                    value={user?.email}
                                    className="bg-earth-300"
                                />
                            </TextField>


                            {/* =================================
                                DESCRIPTION
                            ================================= */}

                            <TextField
                                isInvalid={
                                    Boolean(
                                        errors.description
                                    )
                                }
                            >
                                <Label className="text-earth-800">
                                    Description*
                                </Label>

                                <textarea
                                    name="description"
                                    required
                                    rows={6}
                                    maxLength={1000}
                                    placeholder="Tell adopters about this pet..."
                                    className="w-full resize-none rounded-2xl border border-default-300 bg-earth-300 p-4 text-sm outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
                                    onChange={() =>
                                        clearError(
                                            "description"
                                        )
                                    }
                                />

                                <Description className="text-xs text-earth-500">
                                    Maximum 1000 characters.
                                </Description>

                                <FieldError>
                                    {
                                        errors.description
                                    }
                                </FieldError>
                            </TextField>

                        </Fieldset.Group>


                        {/* =================================
                            SUBMIT
                        ================================= */}

                        <Fieldset.Actions className="pt-4">

                            <Button
                                type="submit"
                                isDisabled={
                                    isSubmitting
                                }
                                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-secondary-700 via-[#D87B21] to-secondary-500 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FloppyDisk className="h-5 w-5" />

                                <span>
                                    {isSubmitting
                                        ? "Publishing Pet..."
                                        : "Publish Pet for Adoption"}
                                </span>
                            </Button>

                        </Fieldset.Actions>

                    </Fieldset>
                </Form>
            </Surface>
        </div>
    );
};

export default AddPetForm;