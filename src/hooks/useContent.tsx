import { useEffect, useState } from "react";
import { ContentDTO } from "../types/dto";
import axios from "axios";

const useContent = (id: string) => {
  const [content, setContent] = useState<ContentDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<ContentDTO>(
          ` https://api.learnhub.thanayut.in.th/content/${id}`
        );

        setContent(res.data);
      } catch (err) {
        setError("Data not found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { content, isLoading, error };
};

export default useContent;
