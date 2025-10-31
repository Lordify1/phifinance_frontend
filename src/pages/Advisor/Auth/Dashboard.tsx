import react, { useEffect, useState } from 'react'
import FounderDashboard from '../Founder/FounderDashboard';
import InvestorDashboard from '../Investor/InvestorDashboard';
import { authCheck } from '@/components/Tools/Misc';
import axios from 'axios';
import { advisorUrl } from '@/app';

export default function UserDashboard(user:any){
    const [project, setProject] = useState([]);
    const [dbData, setDbData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    
    
    if(user?.user?.role === 'founder'){
        useEffect(() => {
            axios.post(`${advisorUrl}/project/get/project`)
            .then((res) => {
                console.log(res);
                setProject(res?.data?.project);
                setSuggestions(res?.data?.suggestions);
            })
            .catch((err) => console.log(err))
        }, [])
    }

    if(user?.user?.role === 'investor'){
        useEffect(() => {
            axios.post(`${advisorUrl}/investordb_data`)
            .then((res) => {
                setDbData(res.data);
                console.log(res)
            })
            .catch((err) => console.log(err));
        },[])
    }
    return(
            user?.user?.role === 'founder' ? (
                <FounderDashboard 
                user={user?.user}
                project={project}
                suggestions={suggestions}
                />
            ) : (
                <InvestorDashboard 
                user={user?.user}
                dbData={dbData}
                />
            )
    )
}