import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

export function Sidebar() {
  const { data } = useGetLessonsQuery();

  return (
    <aside className="w-[348px] bg-gray-700 border-l p-6 border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(({ lessonType, slug, id, availableAt, title }) => (
          <Lesson
            key={id}
            type={lessonType}
            slug={slug}
            title={title}
            availableAt={new Date(availableAt)}
          />
        ))}
      </div>
    </aside>
  );
}
