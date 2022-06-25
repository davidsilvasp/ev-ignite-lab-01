import { Link, useParams } from "react-router-dom";
import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({
  title,
  type,
  slug: videoSlug,
  availableAt,
}: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvaliable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBR }
  );

  const isActiveLesson = slug === videoSlug;

  return isLessonAvaliable ? (
    <Link className="group" to={`/event/lesson/${videoSlug}`}>
      <span className="text-gray-300 block first-letter:uppercase">{availableDateFormatted}</span>

      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActiveLesson,
            "group-hover:border-green-500": isLessonAvaliable,
          }
        )}
      >
        <header className="flex items-center justify-between">
          <span
            className={classNames(
              "text-sm font-medium flex items-center gap-2",
              {
                "text-white": isActiveLesson,
                "text-blue-500": !isActiveLesson,
              }
            )}
          >
            <CheckCircle size={20} />
            Conteúdo liberado
          </span>

          <span
            className={classNames(
              "text-xs rounded py-[0.125rem] px-2 text-white border font-bold",
              {
                "border-white": isActiveLesson,
                "border-green-300": !isActiveLesson,
              }
            )}
          >
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={classNames("mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  ) : (
    <div>
      <span className="text-gray-300 block first-letter:uppercase">{availableDateFormatted}</span>

      <div className="rounded border border-gray-500 p-4 mt-2 opacity-80 cursor-not-allowed">
        <header className="flex items-center justify-between">
          <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
            <Lock size={20} />
            Em breve
          </span>
          <span className="text-xs rounded py-[0.125rem] px-2 text-white border border-green-500 font-bold">
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong className="mt-5 block text-gray-200">{title}</strong>
      </div>
    </div>
  );
}
