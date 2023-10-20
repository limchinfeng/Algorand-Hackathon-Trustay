"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


function Voting() {
    const router = useRouter();
    const handleView = () => {
        toast.success('Thanks for your voting!');
        router.refresh();
        router.push("/");
    };
    return (
        <div className="mx-20 flex flex-row">
            <div className="w-6/12">
                <img className="block ml-auto mr-auto  pb-3" width={500} src="/images/brokenFurniture.jpg" alt="" />
                <img className="block ml-auto mr-auto  pb-10" width={510} src="/images/votingBar.jpg" alt="votingbar" />
                <div className="flex flex-row pl-12">
                    <button onClick={handleView} className="bg-zinc-300 p-1 mr-7 w-60 rounded-lg hover:bg-primary font-light font-base">Vote "Agree" </button>
                    <button onClick={handleView} className="bg-zinc-300 p-1 w-60 rounded-lg hover:bg-primary font-light font-base">Vote "Disagree"</button>
                </div>
            </div>
            <div className="w-6/12">
                <h1 className="text-2xl font-extrabold mb-6">Guest's Unfortunate Mishap Results in Damaged Furniture at Host's Home</h1>
                <p>An Unexpected Incident Puts Hospitality to the TestIn a rather unusual turn of events, a guest or tenant inadvertently caused damage to their host's furniture, leaving both parties with an unexpected challenge to resolve.[Kuala Lumpur, 9/10/2023] - The concept of sharing one's home with guests or tenants has gained immense popularity in recent years, thanks to platforms like Airbnb and VRBO. While most experiences are positive and harmonious, there are occasional incidents that serve as a reminder of the potential risks involved.
                    This recent episode, which unfolded in Kuala Lumpur, involved a guest staying at a host's residence. What was intended to be a simple staycation for the guest took an unexpected turn when, through a series of unfortunate mishaps, a piece of the host's furniture was damaged.
                    The incident serves as a reminder that accidents can happen, even with the best intentions. Fortunately, both the host and the guest are working together to address the situation amicably, highlighting the importance of open communication and understanding between parties in such shared living arrangements.
                    While it may be disheartening to witness damage to personal property, this incident is a testament to the resilience of the sharing economy, where individuals come together to find solutions and maintain positive experiences. It's an opportunity for both host and guest to learn and grow from the experience, promoting a sense of community and understanding.
                    As the story unfolds, we will keep you updated on the resolution and how these two individuals are managing the situation, reinforcing the notion that hospitality and goodwill can prevail even in challenging circumstances.</p>
            </div>

        </div>
    );
}

export default Voting;