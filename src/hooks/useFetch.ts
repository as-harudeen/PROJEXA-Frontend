import { useUserStore } from "@/store/useUserStore";
import { toast } from "react-toastify";

export const useFetch = () => {
  const { updateUser } = useUserStore();

  const getRequest = async (url: string) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 401) {
      toast.error("Unauthorized");
      updateUser(null);
    }
    return res;
  };

  const postRequest = async <T extends object>(url: string, payload: T) => {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_URL + url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.status === 401) {
        toast.error("Unauthorized");
        updateUser(null);
      }
      return res;
    } catch (err) {
      console.log(err);
      throw new Error();
    } 
  };

  const patchRequest = async <T extends object>(url: string, payload: T) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) {
      toast.error("Unauthorized");
      updateUser(null);
    }
    return res;
  };

  const putRequest = async <T extends object>(url: string, payload: T) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) {
      toast.error("Unauthorized");
      updateUser(null);
    }
    return res;
  };

  const deleteRequest = async <T extends object>(url: string, payload?: T) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) {
      toast.error("Unauthorized");
      updateUser(null);
    }
    return res;
  };

  return {
    getRequest,
    postRequest,
    patchRequest,
    putRequest,
    deleteRequest,
  };
};
