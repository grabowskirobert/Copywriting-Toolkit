import CustomButton from "../atoms/CustomButton";
import {db} from "../../firebase/firebase";
import {useAuth} from "../../contexts/AuthContext";
import { updateDoc,setDoc ,doc} from "@firebase/firestore";

export default function TeamForm({setShow}) {

    const {userID} = useAuth();

    async function createTeam(e) {

        e.preventDefault();
        const target = e.target;
        const teamName = target.team_name.value;
        const userRef = doc(db,'users',userID);
        await updateDoc(userRef,{
            team: teamName
        });

        // To chyba bedzie do usuniecia
        await setDoc(doc(db, 'teams',teamName),{
            users: [],
            tasks: [],
            calendar: []
        });
        setShow(false);
        window.location.reload();
    }

    return <div className="p-5">
        <form onSubmit={createTeam} className="text-center">
            <input type="text" placeholder="Team name" name="team_name" required/>
            <CustomButton type="submit">Create</CustomButton>
        </form>
    </div>
}