import {collection, getDocs} from "@firebase/firestore";
import {db} from "../firebase/firebase";
import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";

interface membersProps {
    user?: {
        email?: string,
        role?: string,
        tasks?: Array<string>,
        team?: string,
        uid?: string,
    },
    id?: string;
}

export function useTeamMembers() {

    const {user} = useAuth();
    const [state,setState] = useState<Array<membersProps>>([]);


    useEffect(() => {
         const fetchMember = async() => {
            const res = await getDocs(collection(db, 'users'));
            const data = res.docs?.map((doc)=>{
                return {user: doc.data(), id: doc.id}
            });

            const members = data.filter(member =>
                member.user.role !== 'Admin' && member.user.team === user.team
            )

            setState(members);
        }
        fetchMember()
    },[])

    return state;

}