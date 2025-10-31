import { classMap, colorMap, emptyData, GetIndexData, Loading, NotAuth, starShow } from "@/components/Tools/Misc";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoStar, IoStarOutline } from "react-icons/io5";
import StarRating from "./StarRating";
import SendRequest from "@/components/Tools/SendRequest";
import { advisorUrl } from "@/app";
import { OffCanvasContext } from "@/context/OffCanvasContext";

export const RateForm = ({showComment = true, projectID = null, auth = null, showBtn = false}) => {
    const {offData} = useContext(OffCanvasContext)
    const [data, setData] = useState({
        rate: "",
        comment: "",
        project_id: projectID || offData
    })

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            project_id: projectID || offData
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[projectID, offData])

    return(
        auth !== null ? (
            <>
                <div className="">
                    <div className={`${classMap.pageSection()}`}>
                        <h1 className={classMap.sectionHeader()}>Rate</h1>
                        <div className="flex flex-col pt-2">
                            <StarRating
                                onRatingChange={(d) => 
                                    setData((prev) => ({...prev, rate: d}))
                                }
                            />
                            {showComment && (
                                <textarea 
                                    rows={5}
                                    className={`${classMap.input()}`} name="comment"
                                    onChange={(e) => setData(prev => ({
                                        ...prev,
                                        comment: e.target.value
                                    }))} placeholder="Drop a comment (Optional)"></textarea>
                            )}
                        </div>
                        <SendRequest
                            url={'/advisor/project/rate'}
                            method="post"
                            data={data}
                            className="w-full"
                            onResponse={() => {}}
                            text="Rate"
                        />
                    </div>
                </div>
            </>
        ) : (
            <NotAuth
                action="Rate Project"
            />
        )
    )
}

export const RatesDiv = ({id}: {id: number}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [ratings, setRatings] = useState<any[]>([]);

    useEffect(() => {
        GetIndexData(`${advisorUrl}/project/get_ratings/${id}`)
            .then((res) => {
                setRatings(res);
                console.log(res);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id])

    return(
        <div className={`${classMap.pageSection()}`}>
            <h3 className={`${classMap.sectionHeader()} mb-2`}>Reviews</h3>
            <div>
                {
                    isLoading ? (
                        <Loading/>
                    ) : (
                        ratings.length > 0 ? (
                            <ul className="space-y-4">
                                {ratings.map((rating, idx) => (
                                    <li key={idx} className={`${classMap.section} mt-2 border-gray-100/2 ${classMap.hover} border-2 p-3 rounded-2xl`}>
                                        <div className="flex items-center gap-2">
                                            <h1 className="ml-2 font-semibold">{rating.username || "Anonymous"} {' '} · </h1>
                                            {starShow(rating?.rate)}
                                        </div>
                                        {rating.comment && (
                                            <div className="mt-1 text-gray-300">{rating.comment}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            emptyData('No reviews yet.')
                        )
                    )
                }
            </div>
        </div>
    )
}
