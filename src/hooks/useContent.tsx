import { useEffect, useState } from "react";
import { ContentDTO, EditContentDTO } from "../types/dto";
import axios from "axios";

const useContent = (id: string) => {
  const [content, setContent] = useState<ContentDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const editContent = async (newComment: string, newRating: number) => {
    const newContentBody: EditContentDTO = {
      comment: newComment,
      rating: newRating,
    };

    const token = localStorage.getItem("token");

    setIsSubmitting(true);
    try {
      const res = await axios.patch<ContentDTO>(
        `https://api.learnhub.thanayut.in.th/content/${id}`,
        newContentBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
    } catch (err) {
      throw new Error("Cannot edit post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { content, isLoading, error, isSubmitting, editContent };
};

export default useContent;
