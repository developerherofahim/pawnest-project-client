"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { dmSans } from "@/lib/font";

import {
    Button,
    Description,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    ListBox,
    Modal,
    Select,
    TextField,
} from "@heroui/react";

import { FloppyDisk } from "@gravity-ui/icons";
import { PawPrint, Pencil } from "lucide-react";
import { toast } from "react-toastify";

/* =========================================================
   API
========================================================= */

const API_URL =
    process.env.NEXT_PUBLIC_URL

/* =========================================================
   OPTIONS
========================================================= */

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
    {
        id: "excellent",
        value: "Excellent",
    },
    {
        id: "healthy",
        value: "Healthy",
    },
    {
        id: "minor-health-issue",
        value: "Minor Health Issue",
    },
    {
        id: "under-treatment",
        value: "Under Treatment",
    },
    {
        id: "recovering",
        value: "Recovering",
    },
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

const normalizeString = (value) => {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value).trim();
};

const parseAge = (age) => {
    if (
        age === null ||
        age === undefined ||
        age === ""
    ) {
        return null;
    }

    if (
        typeof age === "object" &&
        age.value !== undefined &&
        age.unit
    ) {
        const value = Number(age.value);

        if (!Number.isFinite(value)) {
            return null;
        }

        const unit = String(age.unit)
            .toLowerCase()
            .startsWith("year")
            ? "years"
            : "months";

        return {
            value,
            unit,
        };
    }

    const match = String(age)
        .trim()
        .match(
            /^(\d+(?:\.\d+)?)\s*(year|years|month|months)$/i
        );

    if (!match) {
        return null;
    }

    return {
        value: Number(match[1]),
        unit: match[2]
            .toLowerCase()
            .startsWith("year")
            ? "years"
            : "months",
    };
};

const formatAge = (age) => {
    const parsed = parseAge(age);

    if (!parsed) {
        return "";
    }

    return `${parsed.value} ${parsed.unit === "years" ? "Years" : "Months"
        }`;
};

const parseWeight = (weight) => {
    if (
        weight === null ||
        weight === undefined ||
        weight === ""
    ) {
        return null;
    }

    if (
        typeof weight === "object" &&
        weight.value !== undefined &&
        weight.unit
    ) {
        const value = Number(weight.value);

        if (!Number.isFinite(value)) {
            return null;
        }

        return {
            value,
            unit: String(weight.unit).toLowerCase(),
        };
    }

    const match = String(weight)
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

const formatWeight = (weight) => {
    const parsed = parseWeight(weight);

    if (!parsed) {
        return "";
    }

    return `${parsed.value} ${parsed.unit === "kg" ? "Kg" : "g"
        }`;
};

/* =========================================================
   INITIAL FORM
========================================================= */

const createInitialForm = (pet) => ({
    petName: normalizeString(pet?.petName),
    breed: normalizeString(pet?.breed),
    species: pet?.species
        ? String(pet.species)
        : "",
    location: normalizeString(pet?.location),
    weight: formatWeight(pet?.weight),
    age: formatAge(pet?.age),
    gender: pet?.gender
        ? String(pet.gender)
        : "",
    adoptionFee:
        pet?.adoptionFee !== null &&
            pet?.adoptionFee !== undefined
            ? String(pet.adoptionFee)
            : "",
    personality: Array.isArray(pet?.personality)
        ? pet.personality.map(String)
        : [],
    healthStatus: pet?.healthStatus
        ? String(pet.healthStatus)
        : "",
    vaccinationStatus: pet?.vaccinationStatus
        ? String(pet.vaccinationStatus)
        : "",
    imageUrl: normalizeString(pet?.imageUrl),
    description: normalizeString(pet?.description),
});

/* =========================================================
   VALIDATION
========================================================= */

const validatePetData = (data) => {
    const errors = {};

    /* Pet name */

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

    /* Breed */

    if (!data.breed) {
        errors.breed = "Breed is required.";
    } else if (data.breed.length < 2) {
        errors.breed =
            "Breed must be at least 2 characters.";
    } else if (data.breed.length > 50) {
        errors.breed =
            "Breed must not exceed 50 characters.";
    }

    /* Species */

    if (!data.species) {
        errors.species = "Please select a species.";
    } else if (!ALLOWED_SPECIES.includes(data.species)) {
        errors.species = "Invalid species selected.";
    }

    /* Location */

    if (!data.location) {
        errors.location = "Location is required.";
    } else if (data.location.length < 2) {
        errors.location =
            "Location must be at least 2 characters.";
    } else if (data.location.length > 100) {
        errors.location =
            "Location must not exceed 100 characters.";
    }

    /* Weight */

    if (!data.weight) {
        errors.weight = "Weight is required.";
    } else {
        const parsedWeight = parseWeight(data.weight);

        if (!parsedWeight) {
            errors.weight =
                "Enter a valid weight such as 2 Kg or 500 g.";
        } else if (parsedWeight.value <= 0) {
            errors.weight = "Weight must be greater than 0.";
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

    /* Age */

    if (!data.age) {
        errors.age = "Age is required.";
    } else {
        const parsedAge = parseAge(data.age);

        if (!parsedAge) {
            errors.age =
                "Enter age like 2 Years or 6 Months.";
        } else if (parsedAge.value <= 0) {
            errors.age = "Age must be greater than 0.";
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

    /* Gender */

    if (!data.gender) {
        errors.gender = "Please select gender.";
    } else if (!ALLOWED_GENDERS.includes(data.gender)) {
        errors.gender = "Invalid gender selected.";
    }

    /* Adoption fee */

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

    /* Personality */

    const personalities = Array.isArray(data.personality)
        ? data.personality
        : [];

    if (personalities.length === 0) {
        errors.personality =
            "Please select at least one personality.";
    } else if (personalities.length > 3) {
        errors.personality =
            "You can select a maximum of 3 personalities.";
    } else if (
        personalities.some(
            (item) =>
                !ALLOWED_PERSONALITIES.includes(item)
        )
    ) {
        errors.personality =
            "Invalid personality selected.";
    }

    /* Health */

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

    /* Vaccination */

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

    /* Image */

    if (!data.imageUrl) {
        errors.imageUrl =
            "Image URL is required.";
    } else {
        try {
            const url = new URL(data.imageUrl);

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

    /* Description */

    if (!data.description) {
        errors.description =
            "Description is required.";
    } else if (data.description.length < 20) {
        errors.description =
            "Description must be at least 20 characters.";
    } else if (data.description.length > 1000) {
        errors.description =
            "Description must not exceed 1000 characters.";
    }

    return errors;
};

/* =========================================================
   SELECT COMPONENT
========================================================= */

const PetSelect = ({
    label,
    value,
    options,
    placeholder,
    error,
    onChange,
    valueKey = "id",
}) => {
    /*
     * HeroUI Select uses the ListBox.Item `id`
     * as its selected value.
     *
     * But our form may store either:
     * - item.id
     * - item.value
     *
     * Therefore we convert the form value
     * back to the corresponding item.id.
     */

    const selectedOption = options.find(
        (item) =>
            String(item[valueKey] ?? "") ===
            String(value ?? "")
    );

    const selectedId =
        selectedOption?.id ?? null;

    return (
        <Select
            value={selectedId}
            onChange={(selected) => {
                if (
                    selected === null ||
                    selected === undefined ||
                    selected === ""
                ) {
                    onChange("");
                    return;
                }

                const selectedOption =
                    options.find(
                        (item) =>
                            String(item.id) ===
                            String(selected)
                    );

                if (!selectedOption) {
                    onChange("");
                    return;
                }

                /*
                 * Return the value that the form
                 * is supposed to store.
                 */
                onChange(
                    String(
                        selectedOption[valueKey] ??
                        selectedOption.id
                    )
                );
            }}
            isInvalid={Boolean(error)}
            className="w-full"
            variant="secondary"
            placeholder={placeholder}
        >
            <Label className="text-sm text-earth-800">
                {label}
            </Label>

            <Select.Trigger className="bg-earth-300">
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
                <ListBox>
                    {options.map((item) => (
                        <ListBox.Item
                            key={item.id}
                            id={item.id}
                            textValue={
                                item.label ??
                                item.value ??
                                item.id
                            }
                        >
                            {item.label ??
                                item.value ??
                                item.id}

                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>

            <FieldError>
                {error}
            </FieldError>
        </Select>
    );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const EditModal = ({ pet }) => {
    if (!pet?._id) {
        return null;
    }

    /*
     * The key is important.
     *
     * If the parent changes from one pet to another,
     * React creates a fresh form state instead of requiring
     * a useEffect + setState synchronization.
     */
    return (
        <EditModalContent
            key={String(pet._id)}
            pet={pet}
        />
    );
};

/* =========================================================
   FORM CONTENT
========================================================= */

const EditModalContent = ({ pet }) => {
    const router = useRouter();

    const generatedId = useId();

    const formId = `edit-pet-form-${generatedId.replace(
        /:/g,
        ""
    )}`;

    const { data: session } =
        authClient.useSession();

    const user = session?.user;

    const [form, setForm] = useState(() =>
        createInitialForm(pet)
    );

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    /* =====================================================
       FORM UPDATE
    ===================================================== */

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => {
            if (!previous[field]) {
                return previous;
            }

            const next = {
                ...previous,
            };

            delete next[field];

            return next;
        });
    };

    /* =====================================================
       PERSONALITY
    ===================================================== */

    const handlePersonalityChange = (label) => {
        setForm((previous) => {
            const currentlySelected =
                previous.personality.includes(label);

            if (!currentlySelected) {
                if (previous.personality.length >= 3) {
                    toast.error(
                        "You can select a maximum of 3 personalities."
                    );

                    return previous;
                }

                return {
                    ...previous,
                    personality: [
                        ...previous.personality,
                        label,
                    ],
                };
            }

            return {
                ...previous,
                personality:
                    previous.personality.filter(
                        (item) => item !== label
                    ),
            };
        });

        setErrors((previous) => {
            if (!previous.personality) {
                return previous;
            }

            const next = {
                ...previous,
            };

            delete next.personality;

            return next;
        });
    };

    const getToken = async () => {
        const { data, error } = await authClient.token();

        if (error) {
            console.error("Token error:", error);
            return null;
        }

        return data?.token;
    };

    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        if (!pet?._id) {
            toast.error(
                "Pet information is missing."
            );
            return;
        }

        if (!user?.email) {
            toast.error(
                "Please login before editing your pet."
            );
            return;
        }

        const cleanedData = {
            petName: normalizeString(form.petName),
            breed: normalizeString(form.breed),
            species: normalizeString(form.species),
            location: normalizeString(form.location),
            weight: normalizeString(form.weight),
            age: normalizeString(form.age),
            gender: normalizeString(form.gender),
            adoptionFee:
                normalizeString(form.adoptionFee),
            personality: Array.isArray(
                form.personality
            )
                ? form.personality
                : [],
            healthStatus: normalizeString(
                form.healthStatus
            ),
            vaccinationStatus: normalizeString(
                form.vaccinationStatus
            ),
            imageUrl: normalizeString(form.imageUrl),
            description: normalizeString(
                form.description
            ),
        };

        /* =================================================
           VALIDATION
        ================================================= */

        const validationErrors =
            validatePetData(cleanedData);

        setErrors(validationErrors);

        if (
            Object.keys(validationErrors).length > 0
        ) {
            toast.error(
                "Please fix the highlighted fields."
            );
            return;
        }

        /* =================================================
           PARSE AGE + WEIGHT
        ================================================= */

        const parsedAge = parseAge(
            cleanedData.age
        );

        const parsedWeight = parseWeight(
            cleanedData.weight
        );

        if (!parsedAge || !parsedWeight) {
            toast.error(
                "Invalid age or weight format."
            );
            return;
        }

        /* =================================================
           PRESERVE EXISTING VALUES
        ================================================= */

        const adoptionStatus =
            pet.adoptionStatus || "Available";

        const ownerEmail =
            pet.ownerEmail || user.email;

        /* =================================================
           COMPLETE PATCH OBJECT
        ================================================= */

        const petData = {
            petName: cleanedData.petName,

            ownerEmail,

            breed: cleanedData.breed,

            species: cleanedData.species,

            location: cleanedData.location,

            age: parsedAge,

            weight: parsedWeight,

            gender: cleanedData.gender,

            adoptionFee: Number(
                cleanedData.adoptionFee
            ),

            personality:
                cleanedData.personality,

            healthStatus:
                cleanedData.healthStatus,

            vaccinationStatus:
                cleanedData.vaccinationStatus,

            imageUrl: cleanedData.imageUrl,

            description:
                cleanedData.description,

            adoptionStatus,
        };

        /* =================================================
           PATCH REQUEST
        ================================================= */

        try {
            setIsSubmitting(true);

            const token = await getToken();

            const response = await fetch(
                `${API_URL}/pets/${pet._id}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json",
                        Accept:
                            "application/json",
                        authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(
                        petData
                    ),
                }
            );

            /* =============================================
               SAFE RESPONSE PARSING
            ============================================= */

            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";

            let result;

            if (
                contentType.includes(
                    "application/json"
                )
            ) {
                result = await response.json();
            } else {
                const text =
                    await response.text();

                result = {
                    message:
                        text ||
                        "Server returned an unexpected response.",
                };
            }

            /* =============================================
               API ERROR
            ============================================= */

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    result?.error ||
                    `Failed to update pet. Server returned ${response.status}.`
                );
            }

            /* =============================================
               SUCCESS
            ============================================= */

            toast.success(
                "Pet updated successfully!"
            );

            router.push("/dashboard/my-listing");
            router.refresh();
        } catch (error) {
            console.error(
                "Edit pet error:",
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
       UI
    ===================================================== */

    return (
        <Modal className={dmSans.className}>
            {/* =================================================
                TRIGGER
            ================================================= */}

            <Modal.Trigger>
                <Button
                    type="button"
                    color="default"
                    variant="bordered"
                    className="
                        flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border-2
                        border-primary-800
                        bg-white
                        px-5
                        font-semibold
                        text-primary-800
                        transition-colors
                        hover:bg-primary-50
                    "
                >
                    <Pencil size={17} />

                    <span>Edit</span>
                </Button>
            </Modal.Trigger>

            {/* =================================================
                BACKDROP
            ================================================= */}

            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="w-full sm:max-w-2xl">
                        <Modal.CloseTrigger />

                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <Modal.Header>
                            <Modal.Icon className="bg-primary-100 text-primary-800">
                                <PawPrint className="size-5" />
                            </Modal.Icon>

                            <div>
                                <Modal.Heading className="text-xl font-bold text-primary-800">
                                    Edit Your Pet
                                </Modal.Heading>

                                <p className="mt-1 text-sm text-default-500">
                                    Update the details below
                                    to edit your pet.
                                </p>
                            </div>
                        </Modal.Header>

                        {/* =================================================
                            BODY
                        ================================================= */}

                        <Modal.Body>
                            <Form
                                id={formId}
                                onSubmit={
                                    handleSubmit
                                }
                            >
                                <Fieldset>
                                    <Fieldset.Group className="space-y-6">
                                        {/* =================================
                                            PET NAME + BREED
                                        ================================= */}

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <TextField
                                                isInvalid={Boolean(
                                                    errors.petName
                                                )}
                                            >
                                                <Label className="text-earth-800">
                                                    Pet Name*
                                                </Label>

                                                <Input
                                                    name="petName"
                                                    value={
                                                        form.petName
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            "petName",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    autoComplete="off"
                                                    placeholder="Enter pet name"
                                                    className="bg-earth-300"
                                                />

                                                <FieldError>
                                                    {
                                                        errors.petName
                                                    }
                                                </FieldError>
                                            </TextField>

                                            <TextField
                                                isInvalid={Boolean(
                                                    errors.breed
                                                )}
                                            >
                                                <Label className="text-earth-800">
                                                    Breed*
                                                </Label>

                                                <Input
                                                    name="breed"
                                                    value={
                                                        form.breed
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            "breed",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    autoComplete="off"
                                                    placeholder="Golden Retriever"
                                                    className="bg-earth-300"
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
                                            <PetSelect
                                                label="Species*"
                                                value={form.species}
                                                options={SPECIES}
                                                placeholder="Select Species"
                                                error={errors.species}
                                                onChange={(value) =>
                                                    updateField(
                                                        "species",
                                                        value
                                                    )
                                                }
                                            />

                                            <TextField
                                                isInvalid={Boolean(
                                                    errors.location
                                                )}
                                            >
                                                <Label className="text-earth-800">
                                                    Location*
                                                </Label>

                                                <Input
                                                    name="location"
                                                    value={
                                                        form.location
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            "location",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Dhaka"
                                                    className="bg-earth-300"
                                                />

                                                <FieldError>
                                                    {
                                                        errors.location
                                                    }
                                                </FieldError>
                                            </TextField>

                                            <TextField
                                                isInvalid={Boolean(
                                                    errors.weight
                                                )}
                                            >
                                                <Label className="text-earth-800">
                                                    Weight*
                                                </Label>

                                                <Input
                                                    name="weight"
                                                    value={
                                                        form.weight
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            "weight",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="2 Kg"
                                                    className="bg-earth-300"
                                                />

                                                <Description className="text-xs text-earth-500">
                                                    Example:
                                                    2 Kg or
                                                    500 g
                                                </Description>

                                                <FieldError>
                                                    {
                                                        errors.weight
                                                    }
                                                </FieldError>
                                            </TextField>
                                        </div>

                                        {/* =================================
                                            AGE + GENDER + FEE
                                        ================================= */}

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                            <TextField
                                                isInvalid={Boolean(
                                                    errors.age
                                                )}
                                            >
                                                <Label className="text-earth-800">
                                                    Age*
                                                </Label>

                                                <Input
                                                    name="age"
                                                    value={
                                                        form.age
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            "age",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="2 Years"
                                                    className="bg-earth-300"
                                                />

                                                <Description className="text-xs text-earth-500">
                                                    Example:
                                                    2 Years
                                                    or 6
                                                    Months
                                                </Description>

                                                <FieldError>
                                                    {
                                                        errors.age
                                                    }
                                                </FieldError>
                                            </TextField>

                                            <PetSelect
                                                label="Gender*"
                                                value={form.gender}
                                                options={GENDERS}
                                                placeholder="Select Gender"
                                                error={errors.gender}
                                                onChange={(value) =>
                                                    updateField(
                                                        "gender",
                                                        value
                                                    )
                                                }
                                            />

                                            <TextField
                                                isInvalid={Boolean(
                                                    errors.adoptionFee
                                                )}
                                            >
                                                <Label className="text-earth-800">
                                                    Adoption
                                                    Fee*
                                                </Label>

                                                <Input
                                                    name="adoptionFee"
                                                    value={
                                                        form.adoptionFee
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            "adoptionFee",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    inputMode="decimal"
                                                    placeholder="5000"
                                                    className="bg-earth-300"
                                                />

                                                <Description className="text-xs text-earth-500">
                                                    Enter
                                                    amount
                                                    in USD
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
                                                    className={`text-sm ${form
                                                        .personality
                                                        .length >=
                                                        3
                                                        ? "font-semibold text-primary-700"
                                                        : "text-earth-500"
                                                        }`}
                                                >
                                                    {
                                                        form
                                                            .personality
                                                            .length
                                                    }
                                                    /3
                                                    selected
                                                </span>
                                            </div>

                                            <div
                                                className={`grid grid-cols-2 gap-3 rounded-xl bg-earth-300 p-4 md:grid-cols-3 ${errors.personality
                                                    ? "border border-danger"
                                                    : ""
                                                    }`}
                                            >
                                                {PERSONALITIES.map(
                                                    (
                                                        item
                                                    ) => {
                                                        const isSelected =
                                                            form.personality.includes(
                                                                item.label
                                                            );

                                                        const isDisabled =
                                                            form.personality
                                                                .length >=
                                                            3 &&
                                                            !isSelected;

                                                        return (
                                                            <label
                                                                key={
                                                                    item.id
                                                                }
                                                                className={`flex items-center gap-2 rounded-lg p-2 transition ${isDisabled
                                                                    ? "cursor-not-allowed opacity-50"
                                                                    : "cursor-pointer hover:bg-earth-200"
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
                                                                    onChange={() =>
                                                                        handlePersonalityChange(
                                                                            item.label
                                                                        )
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
                                            <PetSelect
                                                label="Health Status*"
                                                value={form.healthStatus}
                                                options={HEALTH_STATUSES}
                                                valueKey="value"
                                                placeholder="Select Health Status"
                                                error={errors.healthStatus}
                                                onChange={(value) =>
                                                    updateField(
                                                        "healthStatus",
                                                        value
                                                    )
                                                }
                                            />

                                            <PetSelect
                                                label="Vaccination Status*"
                                                value={form.vaccinationStatus}
                                                options={VACCINATION_STATUSES}
                                                valueKey="value"
                                                placeholder="Select Vaccination Status"
                                                error={errors.vaccinationStatus}
                                                onChange={(value) =>
                                                    updateField(
                                                        "vaccinationStatus",
                                                        value
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* =================================
                                            IMAGE URL
                                        ================================= */}

                                        <TextField
                                            isInvalid={Boolean(
                                                errors.imageUrl
                                            )}
                                        >
                                            <Label className="text-earth-800">
                                                Pet Image
                                                URL*
                                            </Label>

                                            <Input
                                                name="imageUrl"
                                                type="url"
                                                value={
                                                    form.imageUrl
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        "imageUrl",
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                autoComplete="url"
                                                placeholder="https://example.com/pet-image.jpg"
                                                className="bg-earth-300"
                                            />

                                            <FieldError>
                                                {
                                                    errors.imageUrl
                                                }
                                            </FieldError>
                                        </TextField>

                                        {/* =================================
                                            OWNER EMAIL
                                        ================================= */}

                                        <TextField>
                                            <Label className="text-earth-800">
                                                Owner Email*
                                            </Label>

                                            <Input
                                                name="ownerEmail"
                                                type="email"
                                                readOnly
                                                value={
                                                    pet.ownerEmail ||
                                                    user?.email ||
                                                    ""
                                                }
                                                className="bg-earth-300"
                                            />
                                        </TextField>

                                        {/* =================================
                                            DESCRIPTION
                                        ================================= */}

                                        <TextField
                                            isInvalid={Boolean(
                                                errors.description
                                            )}
                                        >
                                            <Label className="text-earth-800">
                                                Description*
                                            </Label>

                                            <textarea
                                                name="description"
                                                value={
                                                    form.description
                                                }
                                                rows={6}
                                                maxLength={
                                                    1000
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        "description",
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                placeholder="Tell adopters about this pet..."
                                                className="w-full resize-none rounded-2xl border border-default-300 bg-earth-300 p-4 text-sm outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
                                            />

                                            <Description className="text-xs text-earth-500">
                                                Maximum
                                                1000
                                                characters.
                                            </Description>

                                            <FieldError>
                                                {
                                                    errors.description
                                                }
                                            </FieldError>
                                        </TextField>
                                    </Fieldset.Group>
                                </Fieldset>
                            </Form>
                        </Modal.Body>

                        {/* =================================================
                            FOOTER
                        ================================================= */}

                        <Modal.Footer className="border-t border-default-200 px-6 py-4">
                            <Button
                                type="submit"
                                form={formId}
                                isDisabled={
                                    isSubmitting
                                }
                                className="
                                    flex
                                    h-12
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-linear-to-r
                                    from-secondary-700
                                    via-[#D87B21]
                                    to-secondary-500
                                    text-base
                                    font-semibold
                                    text-white
                                    shadow-md
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:shadow-lg
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            >
                                <FloppyDisk className="h-5 w-5" />

                                <span>
                                    {isSubmitting
                                        ? "Saving Changes..."
                                        : "Save Changes"}
                                </span>
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditModal;