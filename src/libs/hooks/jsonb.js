import { useCallback, useState } from "react";
import useSWR, { mutate } from "swr";

import api from "../utils/api";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const pathKey = `api/${id}`;
  const { data } = useSWR(id ? pathKey : null);

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
          navigate(`/${res.data.id}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathKey]
  );

  return {
    data: data ? data : {},
    onAdd,
    loading: loading,
  };
};
