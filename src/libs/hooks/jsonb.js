import { useCallback, useState } from "react";
import useSWR, { mutate } from "swr";

import api from "../utils/api";
import { notifications } from "@mantine/notifications";

function copyToClipboard(data) {
  navigator.clipboard
    .writeText(data)
    .then(() => {
      notifications.show({
        title: "Share Success",
        message: "Link copied to clipboard",
      });
    })
    .catch((err) => {
      notifications.show({
        title: "Share Failed",
        message: "Failed to share",
        color: "red",
      });
    });
}

export const useJSON = (id) => {
  const [loading, setLoading] = useState(false);

  const pathKey = `api/${id}`;
  const { data } = useSWR(pathKey);

  const onAdd = useCallback(
    async (data) => {
      setLoading(true);
      try {
        if (!data.data) {
          notifications.show({
            title: "Share Failed",
            message: "No data to share",
            color: "red",
          });

          return;
        }

        const { data: res } = await api.post("api", data);

        if (res?.data?.id) {
          mutate(pathKey);

          copyToClipboard(`${window.location.origin}/${res.data.id}`);
        }
      } catch (error) {
        notifications.show({
          title: "Share Failed",
          message: "Failed to share",
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    },
    [pathKey]
  );

  return {
    data: data ? data : {},
    onAdd,
    loading: loading,
  };
};
