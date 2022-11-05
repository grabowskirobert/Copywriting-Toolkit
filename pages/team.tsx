import React, {useEffect, useState} from 'react'
import CustomButton from '../components/atoms/CustomButton'
import CustomCard from '../components/atoms/CustomCard'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../layouts/Layout'
import privateRoute from '../layouts/PrivateRoute'
import TeamForm from "../components/molecules/TeamForm";
import {collection, doc, getDoc} from "@firebase/firestore";
import { db } from '../firebase/firebase'
import AdminTeamMenu from "../components/organisms/adminTeamMenu";


const Team = () => {
    const [show,setShow] = useState(false);
    // const [teamProps,setTeamProps] = useState<object | undefined>({});
  const { user } = useAuth()

    // useEffect(()=> {
    //     const fetchTeams = async () => {
    //         const TeamRef = doc(db,'teams',user.team)
    //         const yourTeam = await getDoc(TeamRef)
    //        return yourTeam.data();
    //     }
    //
    //     fetchTeams().then(r => setTeamProps(r))
    // },[])

  const TeamComponent = () => {
    if (user.team === '' && user.role === 'Admin') {
      return (
        <>
          <h2 className='text-center mb-4 text-xl'>Create your team</h2>
          <div className='mx-auto mt-4'>
            <CustomButton customFunction={()=>setShow(!show)}>Create Team</CustomButton>
          </div>
        </>
      )
    } else if(user.team !== '' && user.role === 'Admin') {
        return <AdminTeamMenu/>
    } else
      return (
        <>
          <h2 className='text-center mb-4 text-xl'>Your team</h2>
          <div>
            <span className='font-semibold pr-1'>Members: </span>
            {/* {user.email} */}
          </div>
          <div className='mx-auto mt-4'></div>
        </>
      )
  }
  return (
    <Layout>
      <div className='w-2/3 mx-auto'>
        <CustomCard>
            {TeamComponent()}

            {show && <TeamForm  setShow={setShow}/>}
        </CustomCard>

      </div>
    </Layout>
  )
}

export default privateRoute(Team)
