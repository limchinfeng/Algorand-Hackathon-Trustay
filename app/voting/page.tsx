"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Button from "../components/Button";
import { PiUsersThree } from "react-icons/pi"
import { useState } from "react";

function Voting() {
    const router = useRouter();
    const [users, setUsers] = useState(1354);
    const [isLoading, setIsLoading] = useState(false);
    const [isVoted, setIsVoted] = useState(false);

    const onIncrease = () => {
        try {
            setIsLoading(true);
            if (!isVoted) {
                toast.success("You have voted 'Agree'");
                setTimeout(() => {
                    setUsers(user => user + 1)
                }, 1000)
                setIsVoted(true);
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        };
    }

    const onDelete = () => {
        try {
            setIsLoading(true);
            if (!isVoted) {
                toast.success("You have voted 'Disagree'");
                setTimeout(() => {
                    setUsers(user => user + 1)
                }, 1000)
                setIsVoted(true);
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        };
    }

    const onCancel = () => {
        try {
            setIsLoading(true);
            if (isVoted) {
                toast.success("You have cancelled the vote");
                setTimeout(() => {
                    setUsers(user => user - 1)
                }, 1000)
                setIsVoted(false);
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <div className="flex flex-row">
                <div className="w-6/12 flex flex-col gap-4">
                    <img
                        className="rounded-2xl mx-auto hover:scale-105 transition overflow-hidden"
                        width={500}
                        src="/images/brokenFurniture.jpg"
                        alt=""
                    />
                    <h1 className="text-center font-extrabold text-xl">Do you support guest's statement or host's statement </h1>
                    <img
                        className="block ml-auto mr-auto border-2 border-primary rounded-full "
                        width={510}
                        src="/images/votingBar.jpg"
                        alt="votingbar"
                    />
                    <div className="flex flex-row w-[500px] mx-auto gap-2">
                        <PiUsersThree size={24} />
                        {users}
                    </div>
                    <div className="flex flex-row w-[500px] justify-between mx-auto gap-10">
                        {isVoted ? <>
                            <Button
                                label="Cancel Vote"
                                onClick={onCancel}
                                outline
                                disabled={isLoading}
                            />
                        </> : <>
                            <Button
                                label="Vote 'Agree'"
                                onClick={onIncrease}
                                outline
                                disabled={isLoading}
                            />
                            <Button
                                label="Vote 'Disagree'"
                                onClick={onDelete}
                                outline
                                disabled={isLoading}
                            />
                        </>}
                    </div>
                </div>
                <div className="w-6/12 flex flex-col gap-2 ">
                    <h1 className="text-2xl font-extrabold ">
                        Guest's Unfortunate Mishap Results in Damaged Furniture at Host's Home
                    </h1>
                    <p className="font-normal text-sm text-gray-600">
                        24/5/2023
                    </p>
                    <div className="text-justify">
                        <h1 className="text-lg font-extrabold text-primary">Guest:</h1>
                        <p>
                            An Unexpected Incident Puts Hospitality to the TestIn a rather unusual turn of events, a guest or tenant inadvertently caused damage to their host's furniture, leaving both parties with an unexpected challenge to resolve.[Kuala Lumpur, 9/10/2023] - The concept of sharing one's home with guests or tenants has gained immense popularity in recent years, thanks to platforms like Airbnb and VRBO. While most experiences are positive and harmonious, there are occasional incidents that serve as a reminder of the potential risks involved.
                        </p>
                        <br />
                        <h1 className="text-lg font-extrabold text-primary">Host:</h1>
                        <p>
                            This recent episode, which unfolded in Kuala Lumpur, involved a guest staying at a host's residence. What was intended to be a simple staycation for the guest took an unexpected turn when, through a series of unfortunate mishaps, a piece of the host's furniture was damaged. The incident serves as a reminder that accidents can happen, even with the best intentions. Fortunately, both the host and the guest are working together to address the situation amicably, highlighting the importance of open communication and understanding between parties in such shared living arrangements. While it may be disheartening to witness damage to personal property, this incident is a testament to the resilience of the sharing economy, where individuals come together to find solutions and maintain positive experiences. It's an opportunity for both host and guest to learn and grow from the experience, promoting a sense of community and understanding.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Voting;
