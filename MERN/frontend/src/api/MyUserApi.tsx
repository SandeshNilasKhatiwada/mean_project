import { User } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        console.log("here")

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        console.log("here2")


        // Parse and log the JSON data
        const data = await response.json();
        console.log("data", data);

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return data; // Return the parsed data
    };

    const { data: currentUser, isLoading, error } = useQuery("fetchCurrentUser", getMyUserRequest);

    if (error) {
        toast.error(error.toString());
    }

    return { currentUser, isLoading };
};

type CreateUserRequest = {
    auth0Id: String;
    email: String;

};
export const useCreateMyUser = () => {

    const {getAccessTokenSilently} = useAuth0()


    const createMyUserRequest = async (user: CreateUserRequest) =>{
        const accessToken = await getAccessTokenSilently()
        const response = await fetch (`${API_BASE_URL}/api/my/user`,{
            method: "POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        if (!response.ok){
            throw new Error("Failed to create user")
        }
    };

    const {mutateAsync: createUser, isLoading, isError, isSuccess} = useMutation(createMyUserRequest);

    return {
        createUser,isLoading,isSuccess,isError
    }

}
type UpdateMyUserRequest = {
    name: string,
    addressLine1: string,
    city: string,
    country: string
}
export const useUpdateMyUser =() =>{
    const {getAccessTokenSilently} = useAuth0()

    const useUpdateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData),
        })
        if(!response.ok){
            throw new Error ("Failed to update user")
        }

    }

    const {mutateAsync: updateUser, isLoading, isSuccess, isError,error, reset} = useMutation(useUpdateMyUserRequest)
    if(isSuccess){
        toast.success("User profile updated")
    }
    if(error){
        toast.error(error.toString())
        reset()
    }
    return { updateUser,isLoading};
}