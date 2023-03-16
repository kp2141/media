import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
function UserListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);
  const handleClick = () => {
    doRemoveUser(user);
  };
  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan></GoTrashcan>
      </Button>
      {error && <div>Error dleting user.</div>}
      {user.name}
    </>
  );
  return(
    <ExpandablePanel header={header}>
        <AlbumsList user={user}></AlbumsList>
    </ExpandablePanel>
  );
}
export default UserListItem;
