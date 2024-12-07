import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const CategoryCrousel = () => {

    const category = [
        "Fontend",
        "Backend",
        "Data Science",
        "System Manager",
        "System Manager",
        "Fontend",
        "Backend",
        "Data Science",
        "System Manager"
    ]
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-12">
                <CarouselContent>
                    {
                        category.map((element, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                                <Button variant="outline" className="rounded-full">{element}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className=" bg-slate-200 p-4 shadow-lg"/>
                <CarouselNext className=" bg-slate-200 p-4 shadow-lg" />
            </Carousel>
        </div>
    )
}

export default CategoryCrousel