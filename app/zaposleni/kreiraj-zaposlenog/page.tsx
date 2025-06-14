"use client";

import React, { useState, useEffect } from 'react';
import MultiSelect from "@/components/ui/Multiselector";
import { useEdgeStore } from "@/app/utils/edgestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [file, setFile] = useState<File>();
    const [courseName, setCourseName] = useState<string>("");
    const [courseDesc, setCourseDesc] = useState<string>("");
    const [coursePrice, setCoursePrice] = useState<number>(0);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
    const { edgestore }: any = useEdgeStore();
    const options = [
        { value: "moler", label: "Moler" },
        { value: "gipsar", label: "Gipsar" },
        { value: "fasader", label: "Fasader" },
    ];

    async function createCourseFunc(e: any) {
        e.preventDefault();
        if (!file || !courseName.trim() || !courseDesc.trim() || coursePrice < 0) {
            toast.error("All fields must be filled");
            return;
        }
        try {
            const res = await edgestore.publicFiles.upload({file});
            setThumbnailUrl(res.url);

            const email = "kididrtina@gmail.com"
            const response = await axios.post("http://localhost:3000/api/create-course", { courseName: courseName, courseDesc: courseDesc, coursePrice: coursePrice, thumbnailUrl: res.url, author: email })
                .then(res => {
                    console.log(res.data)
                    if (res.status === 200) {
                        toast.success("Course created");
                    } else if (res.status === 500) {
                        toast.error("Something went wrong");
                        return;
                    }
                })
        } catch (err) {}
    }
    return (
        <div>
            <MultiSelect placeholder="Izaberite profesiju" options={options} selectedValues={selectedCategories} setSelectedValues={setSelectedCategories}/>
            <Input type={"file"} onChange={(e ) => setFile(e.target.files?.[0])}/>
            <Button onClick={createCourseFunc}>salji</Button>
        </div>
    );
};

export default Page;