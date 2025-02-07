"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useParams } from "next/navigation"


export default function MovieHome(){
    const params = useParams();

    return(
        <>
        <Header/>
        <Footer/>
        </>
    )
}