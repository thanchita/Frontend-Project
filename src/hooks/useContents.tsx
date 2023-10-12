import { useEffect, useState } from "react";
import { CreateContentDTO, ContentDTO } from "../types/dto";
import axios from "axios";

const useContents = () => {
  const [contents, setContents] = useState<ContentDTO[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<{ data: ContentDTO[] }>(
          "https://api.learnhub.thanayut.in.th/content"
        );

        setContents(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContent = async (
    newVideoUrl: string,
    newComment: string,
    newRating: number
  ) => {
    const newContentBody: CreateContentDTO = {
      videoUrl: newVideoUrl,
      comment: newComment,
      rating: newRating,
    };

    const token = localStorage.getItem("token");

    setIsSubmitting(true);
    try {
      const res = await axios.post<ContentDTO>(
        "https://api.learnhub.thanayut.in.th/content",
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
      throw new Error("Cannot create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { contents, isLoading, isSubmitting, createContent };
};

export default useContents;
