"use client";

import { usePathname, useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Button from "../components/Button";
import useRentModal from "../hooks/useRentModal";

const HostPage = () => {

  // const pathname = usePathname();

  // const containsHost = pathname?.includes('/host');
  const router = useRouter();
  const rentModal = useRentModal();

  return (  
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center mt-5'>
        <Heading 
            center
            title="Host - Home Page"
            subtitle="Manage Your Properties with Ease"
        />
        <div className='w-[24rem] mt-4 flex flex-col gap-5 justify-center items-center'>
          <div className="flex flex-row w-96 gap-5">          
            <Button 
              outline 
              label='My Reservation'
              onClick={() => router.push('/host/reservations')}
            />
            <Button 
              outline 
              label='My Property'
              onClick={() => router.push('/host/properties')}
            />
          </div>
          <div className="flex flex-row w-96 gap-5">
            <Button 
              outline 
              label='Report & Claim'
              onClick={() => router.push('/host/claimReport')}
            />
            <Button 
              outline 
              label='Add Property'
              onClick={rentModal.onOpen}
            />
          </div>
          <Button 
            label="Go to Guest"
            onClick={() => router.push("/")}
          />
        </div>
    </div>
  );
}
 
export default HostPage;