'use client'
import Modal from "@/components/modals/Modal";
import useSellModal from "@/hooks/useSellModal";
import {useMemo, useState} from "react";
import Heading from "@/components/Heading";
import {stuffCategories} from "@/components/navbar/Categories";
import CategoryInput from "@/components/inputs/CategoryInput";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import CountrySelect from "@/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Selector from "@/components/inputs/Selector";
import ImageUpload from "@/components/inputs/imgeUpload";
import Input from "@/components/inputs/Input";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import ZipCodeInput from "@/components/inputs/ZipCodeInput";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const SellModal = () => {
    const sellModal = useSellModal();
    const router = useRouter();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>( {
        defaultValues: {
            category: '',
            location: null,
            brand: '',
            name: '',
            appearanceCondition: 'Like New',
            functionalCondition: 'Fully Functional',
            price: 0,
            imageSrc: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const appearanceCondition = watch('appearanceCondition');
    const functionalCondition = watch('functionalCondition');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);
        axios.post('/api/listings', data)
            .then(() =>{
                toast.success('ListingAndFilter Created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                sellModal.onClose();
            })
            .catch((e) => {
                console.log(e);
                toast.error('Something went wrong.');
            }).finally(() => {
                setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes the stuff you are selling?"
                subtitle="Pick a category"
            />
            <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-3
                  max-h-[50vh]
                  overflow-y-auto
                "
            >
                {stuffCategories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => {setCustomValue('category', category)}}
                            selected={category === item.label}
                            label={item.label}
                            imgSrc={item.imgSrc}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your stuff located?"
                    subtitle="Help buyers find you!"
                />
                <ZipCodeInput
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                {/*<CountrySelect*/}
                {/*    value={location}*/}
                {/*    onChange={(value) => setCustomValue('location', value)}*/}
                {/*/>*/}
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some details about your stuff"
                    subtitle="How is your stuff's condition?"
                />
                <Selector
                    title="How new does it look?"
                    subtitle="Rate your used stuff based on its appearance"
                    labels={["Like New", "Slightly Used", "Used"]}
                    label={appearanceCondition}
                    onChange={(label) => setCustomValue('appearanceCondition', label)}
                />
                <Selector
                    title="Is the stuff functional?"
                    subtitle="Rate your used stuff based on whether it is functional"
                    labels={["Fully Functional", "Partially Functional", "Not Functional/Broken"]}
                    label={functionalCondition}
                    onChange={(label) => setCustomValue('functionalCondition', label)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo for your stuff"
                    subtitle="Show buyers what your stuff looks like!"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your stuff?"
                    subtitle="How it works, what functionalities it have... etc."
                />
                <Input
                    id="brand"
                    label="Brand"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="name"
                    label="Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge for your stuff?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return(
        <Modal
            isOpen={sellModal.isOpen}
            onClose={sellModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Sell Your Stuff!"
            body={bodyContent}
        />
    );
}

export default SellModal;