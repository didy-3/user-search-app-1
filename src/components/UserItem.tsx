import { User } from "../interfaces/User";
import { setCardOpen } from "../store/main";
import { setCurUser } from "../store/users";
import { useAppDispatch } from "../utils/hooks";
import './UserItem.scss'

interface UserItemProps{
    user:User
}
export function UserItem({user}:UserItemProps){
    const dispatch = useAppDispatch()
    function handleItemClick(){
        dispatch(setCurUser(user))
        dispatch(setCardOpen(true))
    }
    return <div className="user-item-wrapper" onClick={handleItemClick}>
        <div className="item-data col-id">{user.id}</div>
        <div className="item-data">{user.name}</div>
        <div className="item-data">{user.email}</div>
        <div className="item-data">{user.phone}</div>
        <div className="item-data">{user.website}</div>
        <div className="item-data">{user.username}</div>
    </div> 
}