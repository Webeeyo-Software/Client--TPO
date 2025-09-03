// hooks/useFetchOptions.ts
// hooks/useFetchOptions.ts
import { useEffect, useState } from "react";
import api from "utils/authApi";

type Option = { label: string; value: string };

export const useFetchOptions = (
  url: string,
  labelKey: string,
  valueKey: string = "id"
) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await api.get(url);
        console.log("Fetched options:", res.data);

        const rawData = Array.isArray(res.data) ? res.data : res.data.data ?? [];

        const formatted = rawData.map((item: any, index: number) => ({
          label: item[labelKey] ?? `Unknown ${index}`,
          value: String(item[valueKey] ?? index),
        }));

        setOptions(formatted);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [url, labelKey, valueKey]);

  return { options, loading };
};

export default useFetchOptions;