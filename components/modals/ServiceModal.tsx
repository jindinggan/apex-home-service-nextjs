'use client';

import useServiceModal from "@/hooks/useServiceModal";
import {useRouter} from "next/navigation";
import {useMemo, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import {toast} from "react-hot-toast";
import Heading from "@/components/Heading";
import {serviceCategories, stuffCategories} from "@/components/navbar/Categories";
import CategoryInput from "@/components/inputs/CategoryInput";
import Modal from "@/components/modals/Modal";
import ZipCodeInput from "@/components/inputs/ZipCodeInput";
import Selector from "@/components/inputs/Selector";
import Input from "@/components/inputs/Input";
import ImageUpload from "@/components/inputs/imgeUpload";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    PRICE = 4
}

const ServiceModal = () => {
    const serviceModal = useServiceModal();

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
            name: '',
            services: '',
            areasServed: '',
            serviceDescription: '',
            priceRangeLowBound: 0,
            priceRangeHighBound: 0,
            imageSrc: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
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
        axios.post('/api/serviceListings', data)
            .then(() =>{
                toast.success('Service Created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                serviceModal.onClose();
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
                title="What is the category of your service?"
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
                {serviceCategories.map((item) => (
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
                    title="Where is your service located?"
                    subtitle="Help customers find you!"
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
                    title="Share details about your business/service"
                    subtitle="How is your stuff's condition?"
                />
                <Input
                    id="name"
                    label="Name of your business/service"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="services"
                    label="List the services that you provide"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="areasServed"
                    label="List the areas that you provide services"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="serviceDescription"
                    label="Give some description about your services"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a cover picture for your business/service"
                    subtitle="Help customers identify you!"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="What is the price range for your service?"
                    subtitle="Provide a price range for a typical service that you provide"
                />
                <span>From</span>
                <Input
                    id="priceRangeLowBound"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <span>To</span>
                <Input
                    id="priceRangeHighBound"
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
            isOpen={serviceModal.isOpen}
            onClose={serviceModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Post Your Services!"
            body={bodyContent}
        />
    );
}

export default ServiceModal;