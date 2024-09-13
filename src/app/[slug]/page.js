import { getSomething } from '../service/getSomething';
;
export const getEiei = async () => {
 await getSomething()
 return 'run'
};

export async function generateStaticParams() {
  console.log('gen')
  return [{id: 'page1'},{id:'page2'}]
}

export default async function Page2() {
  const data = await getEiei();
  console.log(data)

  return <div />;
}

export const revalidate = 30