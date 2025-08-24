// hooks/useFetchOptions.ts
import { useEffect, useState } from "react";

type Option = { label: string; value: string };

export const useFetchOptions = (url: string) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        const formatted = data.map((item: any) => ({
          label: item.name,  // must match your backend field
          value: item.id.toString(), // ensure string for picker
        }));
        setOptions(formatted);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [url]);

  return { options, loading };
};
export default useFetchOptions;