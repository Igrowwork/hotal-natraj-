"use client";

import React from "react";
import { Loader2, Minus, Plus } from "lucide-react";
import { Booking, Plan, Room } from "@prisma/client";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { emailSender } from "@/functions/email-template";

interface PaymentCardProps {
  checkin: string;
  checkout: string;
  rooms: Room[];
  userId: string;
  selectedPlan: Plan[];
  totalNight: number;
}

export default function PaymentCard({
  checkin,
  checkout,
  rooms,
  userId,
  selectedPlan,
  totalNight,
}: PaymentCardProps) {



  const [loading, setLoading] = React.useState<boolean>(false);
  const [guestCount, setGuestCount] = React.useState(1);
  const [childCount, setChildCount] = React.useState(0);
  const [roomCount, setRoomCount] = React.useState<string[]>([rooms[0]?.id]);
  const [totalPrice, setTotalPrice] = React.useState(rooms[0]?.price);
  const [selectPlan, setSelectPlan] = React.useState(selectedPlan[0]?.name);
  const [planPrice, setPlanPrice] = React.useState(
    selectedPlan.find((plan) => plan?.name === selectPlan)?.price 
  );

  const { toast } = useToast();
  const router = useRouter();
  const [name, setName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [phone, setPhone] = React.useState<string>();
  const [address, setAddress] = React.useState<string>();

  function onSelectPlanChange(data: any) {
    setSelectPlan(data);
    setPlanPrice(selectedPlan.find((plan) => plan.name === data)?.price) ;
  }

  const handleChanges = (action: string) => {
    if (action === "guestIncrease" && guestCount < roomCount.length * 4) {
      if (guestCount > roomCount.length * 2 - 1) {
        var roomPrice = roomCount.length * rooms[0].price;
        var extraCharge = (guestCount - roomCount.length * 2 + 1) * 400;
        setTotalPrice(roomPrice + extraCharge);
      } else {
        setTotalPrice(roomCount.length * rooms[0].price);
      }
      setGuestCount((prev) => prev + 1);
    }

    if (action === "guestDecrease" && guestCount > 1) {
      // If the guest count is beyond the initial two guests per room, adjust the total price
      if (guestCount > roomCount.length * 2) {
        var roomPrice = roomCount.length * rooms[0].price;
        var extraCharge = (guestCount - roomCount.length * 2 - 1) * 400;
        setTotalPrice(roomPrice + extraCharge);
      } else {
        // If the guest count is within the initial two guests per room, set the total price accordingly
        setTotalPrice(roomCount.length * rooms[0].price);
      }

      setGuestCount((prev) => prev - 1);
    }

    if (action === "roomIncrease" && rooms.length > roomCount.length) {
      if (guestCount === roomCount.length * 4) {
        setRoomCount((prev) => [...prev, rooms[prev.length % rooms.length].id]);
        setTotalPrice((roomCount.length + 1) * rooms[0].price);
      } else {
        setRoomCount((prev) => [...prev, rooms[prev.length % rooms.length].id]);
        setTotalPrice((roomCount.length + 1) * rooms[0].price);
      }
    }

    if (
      action === "roomDecrease" &&
      roomCount.length > 1 &&
      guestCount <= (roomCount.length - 1) * 4
    ) {
      // If the guest count is beyond the initial two guests per room, adjust the total price
      if (guestCount > (roomCount.length - 1) * 2) {
        var roomPrice = (roomCount.length - 1) * rooms[0].price;
        var extraCharge = (guestCount - (roomCount.length - 1) * 2) * 400;
        setTotalPrice(roomPrice + extraCharge);
      } else {
        // If the guest count is within the initial two guests per room, set the total price accordingly
        setTotalPrice((roomCount.length - 1) * rooms[0].price);
      }
      setRoomCount((prev) => prev.slice(0, -1));
    }
  };

  const checkoutHandler = async (amount: number) => {
    if (!name || !email || !phone) {
      toast({
        title: "You need to fill required fields!",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      const key = await axios.post("/api/getkey");
      const { endpoint } = await (await axios.post("/api/getendpoint")).data;
      const response = await axios.post(`${endpoint}/api/checkout`, {
        amount,
      });
      const { order } = response.data;

      var options = {
        key: key.data.key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Hotel Natraj",
        description: "Hotel Natraj Payment",
        image: "https://cdn-icons-png.flaticon.com/512/219/219970.png",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response: {
          razorpay_payment_id: any;
          razorpay_order_id: any;
          razorpay_signature: any;
        }) {
          const res = await axios.post("/api/paymentverification", {
            response: response,
            data: {
              userId: userId,
              roomIds: roomCount,
              startDate: checkin,
              endDate: checkout,
              totalPrice: totalPrice,
              selectedPlan: selectPlan,
              username: name,
              useremail: email,
              userphone: phone,
              children: childCount,
              adults: guestCount,
            },
          });
          // Check for errors in the response
          if (res.data.success) {
            // Handle successful payment
            toast({
              title: "Payment Success",
              description: "Your room has been booked successfully!",
              duration: 15000,
            });
            const Id = res.data.booking.id;
            await emailSender(res.data.booking);
            router.replace(`/success?bookingId=${Id}`);
          } else {
            // Handle payment failure
            toast({
              title: res.data.error.reason,
              description: res.data.error.description,
              duration: 15000,
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      //@ts-ignore
      const razor = new window.Razorpay(options);
      //@ts-ignore
      razor.on(
        "payment.failed",
        function (response: {
          error: {
            code: any;
            description: any;
            source: any;
            step: any;
            reason: any;
            metadata: { order_id: any; payment_id: any };
          };
        }) {
          toast({
            title: response.error.reason,
            description: response.error.description,
            variant: "destructive",
            duration: 15000,
          });
        }
      );
      //@ts-ignore
      razor.open();
    } catch (error) {
      // Handle API call error
      console.error("Error in checkout API call:", error);
      toast({
        title: "Error",
        description: "An error occurred during checkout. Please try again.",
        variant: "destructive",
        duration: 15000,
      });
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };


  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-xs sm:text-sm font-medium">
            Full Name*
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Your Name"
            className="h-12 border rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-xs sm:text-sm font-medium">
            Email*
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Your Email"
            className="h-12 border rounded p-2"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-xs sm:text-sm font-medium">
            Phone Number*
          </label>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Enter Your Number"
            className="h-12 border rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-xs sm:text-sm font-medium">
            Address
          </label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter Your Address"
            className="h-12 border rounded p-2"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start my-2">
        <div className="w-full flex justify-between items-center text-[#393b3bcc] font-normal p-2 h-12 border rounded-md">
          <p>Check-in: </p>
          <p>{checkin}</p>
        </div>
        <div className="w-full flex justify-between items-center text-[#393b3bcc] font-normal p-2 h-12 border rounded-md">
          <p>Check-out: </p>
          <p>{checkout}</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 text-sm sm:text-base lg:text-lg font-medium py-4">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3">
            <span>Adult</span>
            <span className="flex items-center justify-center gap-5">
              <button
                className="text-white bg-primary h-fit p-1"
                onClick={() => handleChanges("guestDecrease")}
              >
                <Minus className="h-4 w-4 text-white" />
              </button>
              <span className="w-fit px-4 py-1 border">{guestCount}</span>
              <button
                className="text-white bg-primary h-fit p-1 relative"
                onClick={() => handleChanges("guestIncrease")}
              >
                <Plus className="h-4 w-4 text-white" />
              </button>
            </span>
            <span className="text-right">x &nbsp; ₹400</span>
          </div>
          <div className="grid grid-cols-3">
            <span>Children</span>
            <span className="flex items-center justify-center gap-5">
              <button
                className="text-white bg-primary h-fit p-1"
                onClick={() =>
                  setChildCount(childCount > 0 ? childCount - 1 : 0)
                }
              >
                <Minus className="h-4 w-4 text-white" />
              </button>
              <span className="w-fit px-4 py-1 border">{childCount}</span>
              <button
                className="text-white bg-primary h-fit p-1 relative"
                onClick={() => setChildCount(childCount + 1)}
              >
                <Plus className="h-4 w-4 text-white" />
              </button>
            </span>
          </div>
          <div className="grid grid-cols-3">
            <span>Room</span>
            <span className="flex items-center justify-center gap-5">
              <button
                className="text-white bg-primary h-fit p-1"
                onClick={() => handleChanges("roomDecrease")}
              >
                <Minus className="h-4 w-4 text-white" />
              </button>
              <span className="w-fit px-4 py-1 border">{roomCount.length}</span>
              <button
                className="text-white bg-primary h-fit p-1 relative"
                onClick={() => handleChanges("roomIncrease")}
              >
                <Plus className="h-4 w-4 text-white" />
              </button>
            </span>
          </div>
          <div className="grid grid-cols-3">
            <span>Plan</span>
            <select
              name=""
              id=""
              defaultValue={selectPlan}
              onChange={(e) => onSelectPlanChange(e.target.value)}
              className="border-2"
            >
              {selectedPlan.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          <p>{planPrice}</p>
          <div className="flex flex-col gap-3 mt-5">
            <h3 className="text-xl uppercase">{`total`}</h3>
            {totalNight <= 0 ? (
              <span className="text-4xl text-primary">
                {`₹`}{" "}
                {(totalPrice + guestCount * planPrice!) * (totalNight + 1)}
              </span>
            ) : (
              <span className="text-4xl text-primary">
                {`₹`} {(totalPrice + guestCount * planPrice!) * totalNight}
              </span>
            )}
          </div>
        </div>
      </div>
      {totalNight <= 0 ? (
        <button
          disabled={loading}
          className="py-3 bg-blue-800 text-white rounded-lg w-full flex items-center justify-center"
          onClick={() =>
            checkoutHandler(
              (totalPrice + guestCount * planPrice!) * (totalNight + 1)
            )
          }
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Pay Now
        </button>
      ) : (
        <button
          disabled={loading}
          className="py-3 bg-blue-800 text-white rounded-lg w-full flex items-center justify-center"
          onClick={() =>
            checkoutHandler((totalPrice + guestCount * planPrice!) * totalNight)
          }
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Pay Now
        </button>
      )}
    </>
  );
}
