import Image from "next/image";
import Link from "next/link";
// import { getAppInsightsInstance } from "@/lib/serverAppInsight";

export default async function Home() {
  // const appInsightsInstance = await getAppInsightsInstance();

  // appInsightsInstance.trackTrace({ message: "test" });
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Link href="/career/page1">
          <Image
            width={40}
            height={40}
            src="/assets/img/icon/prev-blue.png"
            alt="img1"
          />
        </Link>
        <Link href="/career/page2">
          <Image
            width={40}
            height={40}
            src="/assets/img/icon/next-blue.png"
            alt="img2"
          />
        </Link>
        <Link href="/career/page3">
          <Image
            width={40}
            height={40}
            src="/assets/img/logo/arise-logo.png"
            alt="img3"
          />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Link href="/career/page4">
          <Image
            width={40}
            height={40}
            src="/assets/img/icon/close.png"
            alt="img4"
          />
        </Link>
        <Link href="/career/page5">
          <Image
            width={40}
            height={40}
            src="/assets/img/icon/linkedin.png"
            alt="img5"
          />
        </Link>
        <Link href="/career/page6">
          <Image
            width={40}
            height={40}
            src="/assets/img/icon/chevron.png"
            alt="img6"
          />
        </Link>
      </div>
    </>
  );
}
