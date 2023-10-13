import { useEffect, useState } from "react";
import { ContentDTO, EditContentDTO } from "../types/dto";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        const newDate = toDate(res.data.createdAt);
        const newUpdate = toDate(res.data.updatedAt);
        setContent({ ...res.data, createdAt: newDate, updatedAt: newUpdate });
      } catch (err) {
        setError("Data not found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toDate = (d: string) => {
    const date = new Date(d);
    return date.toDateString();
  };

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

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const deleteContent = async () => {
    try {
      await axios.delete(`https://api.learnhub.thanayut.in.th/content/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      setError("Cannot delete post");
    }
  };

  return {
    content,
    isLoading,
    error,
    isSubmitting,
    editContent,
    deleteContent,
  };
};

export default useContent;
