'use client';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import getCurrentUser from "@/app/actions/getCurrentUser";
import useMessageModal from "@/hooks/useMessageModal";
import {useRouter} from "next/navigation";
import {useMemo, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import Heading from "@/components/Heading";
import dynamic from "next/dynamic";
import {stuffCategories} from "@/components/navbar/Categories";
import CategoryInput from "@/components/inputs/CategoryInput";
import Modal from "@/components/modals/Modal";
import Input from "@/components/inputs/Input";
enum STEPS {
    MESSAGE = 0,
    INFO = 1,
}
const MessageModal = () => {
    const messageModal = useMessageModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.MESSAGE);

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
            message: '',
            name: '',
            email: '',
            phone: '',
            zipcode: '',
        }
    });

    const message = watch('message');
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
        if(step !== STEPS.INFO) {
            return onNext();
        }

        setIsLoading(true);
        axios.post('/api/listings', data)
            .then(() =>{
                toast.success('ListingAndFilter Created!');
                router.refresh();
                reset();
                setStep(STEPS.MESSAGE);
                messageModal.onClose();
            })
            .catch((e) => {
                console.log(e);
                toast.error('Something went wrong.');
            }).finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Send';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.MESSAGE) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Send message to Plumber LLC"
            />
            <Input
                id="message"
                label="Tell the professional what you have in mind"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                className="h-64"
            />
        </div>
    )

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Send Message"
                    subtitle="Please provide your contact information"
                />
                <Input
                    id="name"
                    label="Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <Input
                    id="email"
                    label="Email"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <Input
                    id="phone"
                    label="Mobile Phone Number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="zipcode"
                    label="Your 5-digit Zipcode"
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
            isOpen={messageModal.isOpen}
            onClose={messageModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.MESSAGE ? undefined : onBack}
            title="Send Message"
            body={bodyContent}
        />
    );
}

export default MessageModal;