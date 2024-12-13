import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user/userStore";

const domain = import.meta.env.VITE_API_URL;

export async function apiGet<T>(
  path: string,
  headers: HeadersInit | undefined = undefined
): Promise<T> {
  const response = await makeRequest(path, "GET", headers, null);
  throwErrorIfNeeded(response);
  return await response.json();
}

export async function apiPatch(path: string, payload: any): Promise<void> {
  if (payload !== null) {
    payload = JSON.stringify(payload);
  }
  const response = await makeRequest(path, "PATCH", undefined, payload);
  throwErrorIfNeeded(response);
}

export async function apiPost(path: string, payload: any) {
  if (payload !== null) {
    payload = JSON.stringify(payload);
  }
  const response = await makeRequest(path, "POST", undefined, payload);
  throwErrorIfNeeded(response);
}

export async function apiPut(path: string, payload: any) {
  if (payload !== null) {
    payload = JSON.stringify(payload);
  }
  const response = await makeRequest(path, "PUT", undefined, payload);
  throwErrorIfNeeded(response);
}

export async function apiDelete(path: string, payload?: any): Promise<void> {
  const response = await makeRequest(
    path,
    "DELETE",
    {},
    JSON.stringify(payload)
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Unexpected error");
  }
}

function throwErrorIfNeeded(response: Response) {
  if (response.ok) {
    return;
  }
  if (!response.ok) {
    throw response;
  } else {
    throw new Error("Unexpected error");
  }
}

async function makeRequest(
  path: string,
  httpMethod: string,
  headers: HeadersInit = {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  payload: null | string = null,
) {
  const userStore = useUserStore();
  const { loggedUser } = storeToRefs(userStore);

  if (!loggedUser.value) {
    throw new Error("User must be logged to make requests");
  }
  headers = {
    ...{
      "X-AUTH-TOKEN": loggedUser.value.token,
    },
    ...headers,
  };

  let init: RequestInit = {
    method: httpMethod,
    headers,
  };
  if (null !== payload) {
    init.body = payload;
  }
  return await fetch(new URL(path, domain), init);
}
