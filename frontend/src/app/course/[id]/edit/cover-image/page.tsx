import { notFound } from "next/navigation";
import * as api from "@/lib/api";
import UI from "./ui";

export default async function EditCourseCoverImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await api.getCourseById(id);

  if (!course.data || course.error) {
    notFound();
  }

  return <UI course={course.data} />;
}