"use client"
import React from 'react'
import SelectOption from './_components/SelectOption'
import { useState } from 'react'
import { Button } from "@/components/ui/button";
import TopicInput from './_components/TopicInput';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Create() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Function to handle user input and save it to state 
    const handleUserInput = (fieldName, fieldValue) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldValue
        }))
        console.log("Form Data Updated:", formData);
    }

    const GenerateCourseOutline = async () => {
        const courseId = uuidv4();
        setLoading(true);
        const result = await axios.post('/api/generate-course-outline', {
            courseId: courseId,
            ...formData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });
        setLoading(false);
        router.replace('/dashboard');
        toast("Your course Content is being generated, refresh the page after few minutes");
        console.log(result.data.result.resp);
    }

    return (
        <div className='flex flex-col items-center mt-15 p-5 md:px-24 lg:px-36'>
            <h2 className='font-bold text-4xl text-blue-700'>Start Building Your Personal Study Material</h2>
            <p className='text-gray-500 text-lg'>Fill all details to generate study material for you next project</p>
            <div className='mt-10'>
                {step == 0
                    ? <SelectOption selectedStudyType={(value) => handleUserInput('studyType', value)} />
                    : <TopicInput setTopic={(value) => handleUserInput('topic', value)} setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)} />}
            </div>
            <div className='flex justify-between w-full m-32'>
                {step != 0 ? <Button onClick={() => setStep(step - 1)} variant="outline">Previous</Button> : '-'}
                {step == 0 ? <Button onClick={() => setStep(step + 1)} className="border-s-blue-500">Next</Button> : <Button onClick={GenerateCourseOutline} disabled={loading}>{loading ? <Loader className='animate-spin' /> : 'Generate'}</Button>}
            </div>
        </div>
    )
}

export default Create
