import { useQuery } from "react-query";
import { api } from "../api";

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type GetUSersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUSers(page: number): Promise<GetUSersResponse> {
    const { data, headers } = await api.get("users", {
      params: {
        page,
      }
    });

    const totalCount = Number(headers["x-total-count"]);

    const users = data.users.map((user) => {
      return {
        ...user,
        createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      };
    });

    return {
      totalCount,
      users
    };
}

export function useUsers(page: number) {
    return useQuery(["users", page], () => getUSers(page),{
        staleTime: 1000 * 10, // 5 segundos
      }
    );
  }