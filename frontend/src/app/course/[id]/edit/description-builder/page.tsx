import * as api from "@/lib/api";
import { notFound } from "next/navigation";
import UI from "./ui";

export default async function EditCourseDescriptionBuilderPage({
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