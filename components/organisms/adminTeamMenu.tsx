import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import {useEffect, useState} from "react";
import CustomCard from "../atoms/CustomCard";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "../../firebase/firebase";

interface membersProps {
    user?: {
        email?: string,
        role?: string,
        tasks?: Array<string>,
        team?: string,
        uid?: string,
    },
    id?: string
}

function AdminTeamMenu() {
    const {user,signup} = useAuth();
    const [show,setShow] = useState<boolean>(false)
    const [members,setMembers] = useState<Array<membersProps>>([]);

    function CreateUser() {

        function create(e:any) {
            e.preventDefault();
            const target = e.target;

            const email = target.email.value
            const password = target.password.value
            const role = target.role.value
            //To jest to poprawienia - po utworzeniu uzytkownika przelacza na nowo utworzonego uzytkownika
            signup(email,password,role,user.team);
            console.log('account created...');
            setShow(!show);

        }

        return <CustomCard >
            <p>New user</p>
            <form onSubmit={create}>
                <input type="text" name="email" placeholder="Email" required/>
                <input type="text" name="password" placeholder="Password" required/>
                <select name="role">
                    <option value="webmaster">Webmaster</option>
                    <option value="webpublisher">Web publisher</option>
                    <option value="copywriter">Copywriter</option>
                </select>
                <CustomButton>Create</CustomButton>
            </form>
        </CustomCard>

    }




    useEffect(()=>{
        function teamMembers() {
            getDocs(collection(db, 'users')).then((snapshot) => {
                const usersUID = snapshot.docs.map((doc) => {
                    return {user: doc.data(),id: doc.id}
                });
                return usersUID.filter(member => {
                    if(member.user.role !== 'Admin' && member.user.team === user.team) return member.user
                })
            }).then((member:({[p:string]:any})[]) => setMembers(member))

        }
       return teamMembers();
    },[])



    return <>
        <p>Team: {user.team}</p>
        <br/>
        <Container className="mb-5">
            <Users>Users:
                <List>
                    {
                        members?.map((el,index) => {
                            return <div key={index}><p >{el?.user?.email} - {el?.user?.role}</p></div>
                        })
                    }
                </List>
                <CustomButton customFunction={()=>setShow(!show)}>Create User</CustomButton>
            </Users>
        </Container>
        {show && <CreateUser />}
    </>
}

const Container = styled.div`

`;

const Tasks = styled.div`

`;

const Users = styled.div`
`;

const List = styled.div`
`;

export default  AdminTeamMenu;