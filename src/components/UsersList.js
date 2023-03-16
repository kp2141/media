import { useEffect } from "react";
import { fetchUsers,addUser } from "../store";
import { useSelector } from "react-redux";
import Button from './Button'
import Skeleton from "./Skeleton";
import { useThunk } from "../hooks/use-thunk";
import UserListItem from './UserListItem'


function UsersList() {
    const [doFetchUsers,isLoadingUsers,loadingUsersError] = useThunk(fetchUsers) 
    const [doCreateUser,isCreatingUser,creatingUserError] = useThunk(addUser) 

   const {data} = useSelector((state)=>{
        return state.users
    })
    useEffect(()=>{
        doFetchUsers()
    },[doFetchUsers])
    const handleUserAdd = () =>{
        doCreateUser()
    }
    let content;
    if (isLoadingUsers){
        content = <Skeleton times={6} className="h-10 w-full"></Skeleton>
    }else if (loadingUsersError){
        content = <div>Error fetching data...</div>
    } else{
        content = data.map((user)=>{
            return <UserListItem key={user.id} user={user}/>
            
        })
    }
    
    return (
    <div>

        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>   
            <Button loading = {isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
            {creatingUserError && 'Error creating user...'}
        </div>
        <div>{content}</div>
    </div>
    );
  }
  
  export default UsersList;
  