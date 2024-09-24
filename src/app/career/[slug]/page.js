import { getSomething } from "../../service/getSomething";
import _forEach from "lodash/forEach";
import _isEmpty from "lodash/isEmpty";
import _last from "lodash/last";
import _get from "lodash/get";
import TestForm from "@/section/TestForm";
import TestDescription from "@/section/TestDescription";
import _find from "lodash/find";
import { redirect } from "next/navigation";

export const dynamicParams = true;

const myPage = [
  {
    id: "page1",
    data: "data from page 1",
  },
  {
    id: "page2",
    data: "data from page 2",
  },
  {
    id: "page3",
    data: "data from page 3",
  },
  {
    id: "page4",
    data: "data from page 4",
  },
  {
    id: "page5",
    data: "data from page 5",
  },
  {
    id: "page6",
    data: "data from page 6",
  },
];

export async function generateStaticParams() {
  const arr = [];

  myPage.forEach((d) => {
    arr.push({ slug: d.id });
    arr.push({ slug: `${d.id}-form` });
  });
  return arr;
}

export default async function Page2({ params }) {
  const { slug } = params;
  await getSomething()
  let job = slug
  const splitSlug = slug.split("-");
  const isForm = _last(splitSlug) === "form";
  if (isForm) {
    job = slug.slice(0, -5);
  }

  const find = _find(myPage, ["id", job]);

  if (!find) {
    redirect("/");
  }

  const data = find.data;
  return isForm ? <TestForm data={data} /> : <TestDescription data={data} slug={slug}/>;
}

export const revalidate = 60;
