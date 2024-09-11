import { Button } from "@/components/ui/button";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { robotoFlex } from "../../fonts";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const FilterSection = async () => {
  const roomDetails = await prismadb.room.findMany({
    where: {
      isFeatured: true,
    },
  });
  const startDate = new Date();
  const endDate = new Date();

  const fallbackSrc = "./assets/rooms/room (4).jpeg";
  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");
  return (
    <section className="pt-16 flex flex-col gap-10 h-full w-full px-[5%]">
      <div className="flex flex-col gap-3">
        <h2
          className={cn(
            "text-5xl font-bold text-center text-primary",
            robotoFlex.className
          )}
        >{`Best Room in Hotel Natraj`}</h2>
        <p className="text-xl font-medium mt-3 text-center">{`Discover idyllic destinations for your perfect gateway. Explore our curated list of top holiday spots.`}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mx-auto relative">
        {roomDetails.map((data, index) => (
          <Card
            key={index}
            className="w-full mx-auto border-2 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-linear"
          >
            <CardHeader>
              <div className="h-[200px] w-full relative">
                <Image
                  src={data.image ? data.image : fallbackSrc}
                  alt=""
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                  className="object-cover rounded-md"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <h3 className="text-3xl font-semibold">{data.name}</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="relative h-6 w-6">
                      <Image
                        src={"/assets/images/guests.png"}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>{`Up to 5 guests`}</span>
                  </div>
                  {/* <div className="flex gap-2">
                    <div className="relative h-6 w-6">
                      <Image
                        src={"/assets/images/bed.png"}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>{`four Double bed`}</span>
                  </div> */}
                  <div className="flex gap-2">
                    <div className="relative h-6 w-6">
                      <Image
                        src={"/assets/images/snow.png"}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>{`Air Conditioning`}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative h-6 w-6">
                      <Image
                        src={"/assets/images/dish.png"}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>{`Room Service`}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between py-4 border-t mx-5 px-0">
              <div>
                <span className="text-3xl lg:text-2xl xl:text-3xl font-bold">{`₹${data.price}`}</span>
                <span className="text-sm">/per night</span>
              </div>
              <Link
                href={`/rooms?categoryId=${data.categoryId}&startDate=${formattedEndDate}&endDate=${formattedStartDate}`}
              >
                <Button className="text-sm xl:text-lg font-medium bg-white text-primary border border-primary hover:text-white hover:bg-primary">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FilterSection;
